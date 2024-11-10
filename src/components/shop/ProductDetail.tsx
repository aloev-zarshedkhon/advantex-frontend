import { Colors, Variables } from "@/utils/consts";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import CustomImage from "../reusable/CustomImage";
import ShareComponent from "../reusable/SHareComponent";
import ItemNotFound from "../reusable/ItemNotFound";
import { FlexBox, pageContainer } from "@/utils/globalStyles";
import { DecrementIcon, IncrementIcon, LikeIcon } from "@/assets/icons";
import { useRouter } from "next/router";
import {
  deleter,
  getter,
  poster,
  sumFormatter,
  translate,
} from "@/utils/functions";
import {
  Product,
  ProductDetailType,
  productDetailTypes,
} from "@/types/product";
import Loading from "../reusable/loading";
import { AuthContext } from "@/context";
import HtmlContent from "../reusable/HtmlContent";
import SliderWrapper from "../reusable/SliderWrapper";

const MiniText = ({
  bold,
  simple,
}: {
  bold: string;
  simple: string;
}): ReactElement => {
  return (
    <Stack sx={{ ...FlexBox, justifyContent: "left" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontFamily: "Arial",
          textAlign: "right",
          width: "70px",
        }}
      >
        {bold}
      </Typography>

      <Typography
        variant="h4"
        sx={{ color: "#636363", fontFamily: "Arial", textAlign: "left" }}
      >
        : {simple}
      </Typography>
    </Stack>
  );
};

type Props = {
  id: number;
};

type dataType = {
  load: boolean;
  data?: ProductDetailType;
  error?: boolean;
};
const ProductDetailComponent = ({ id }: Props): ReactElement => {
  const {
    lang,
    accessToken,
    favoriteProducts,
    setFavoriteProducts,
    setCartProducts,
  } = useContext(AuthContext);

  const isLiked = (productId: number): boolean => {
    const find =
      favoriteProducts.data?.length &&
      favoriteProducts.data?.find((e) => e.id == productId);
    return Boolean(find);
  };
  const handleLIke = async (productId: number) => {
    const remove = isLiked(productId);

    if (!remove) {
      const result = await poster(
        "shop/add_to_favorite/",
        { id: productId },
        true
      );
      if (result.ok) {
        const old = favoriteProducts?.data?.length ? favoriteProducts.data : [];
        setFavoriteProducts({
          ...favoriteProducts,
          data: [...old, result.data],
        });
      }
    } else {
      const result = await deleter(
        `shop/remove_from_favorite/${productId}`,
        true
      );

      if (result.ok) {
        const filter: Product[] = favoriteProducts.data
          ? favoriteProducts.data.filter((e) => e.id != Number(productId))
          : [];

        setFavoriteProducts({ ...favoriteProducts, data: filter });
      }
    }
  };
  const [data, setData] = useState<dataType>();
  useEffect(() => {
    const getValues = async () => {
      setData({ load: true });
      const result = await getter(`shop/product/${id}`);
      if (result.ok && result?.data) {
        setData({
          load: false,
          data: result.data,
          error: false,
        });
      } else {
        setData({ load: false, data: undefined, error: true });
      }
    };
    getValues();
  }, [id]);

  const [counter, setCounter] = useState<number>(1);
  const router = useRouter();

  const maxCount = Number(Variables.max_count) ?? 99;

  const handleIncrement = () => {
    if (counter < maxCount) {
      setCounter(counter + 1);
    }
  };

  const handleDecrement = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const handleAddToCart = async () => {
    const result = await poster(
      "shop/add_to_cart/",
      { product: id, quantity: counter },
      true
    );
    if (result.ok && result.data) {
      setCartProducts({
        load: false,
        data: result.data,
        error: false,
      });
    }
  };

  const handleGoToCheckout = () => {
    if (accessToken) {
      router.push("/checkout");
    } else {
      router.push("/login");
    }
  };

  const images = (): string[] => {
    const images: string[] = data?.data
      ? data.data.images.map((e) => e.image)
      : [];
    if (data?.data) {
      images.unshift(data.data.main_image?.image);
    }
    return images;
  };

  return (
    <Stack>
      {data?.load && <Loading />}
      {data?.error && <ItemNotFound />}
      {data?.data && (
        <Stack
          sx={{
            ...pageContainer,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            sx={{
              ...FlexBox,
              alignItems: "flex-start",
            }}
          >
            <Grid item xs={12} lg={4.8}>
              <SliderWrapper fade={false}>
                {images().map((e, index) => (
                  <CustomImage
                    key={index}
                    src={e}
                    alt={data?.data?.name}
                    sx={{
                      width: "100%",
                      maxWidth: "100%",
                      height: "100%",
                    }}
                    imageStyle={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ))}
              </SliderWrapper>
            </Grid>
            <Grid item xs={12} lg={7}>
              <Stack sx={FlexBox}>
                <Typography variant="h5">
                  {data.data.type[`name_${lang}` as keyof productDetailTypes]}
                </Typography>
                <IconButton onClick={() => handleLIke(id)}>
                  <LikeIcon liked={isLiked(id)} />
                </IconButton>
              </Stack>
              <Typography variant="h2">{data.data.name}</Typography>
              <HtmlContent
                content={String(
                  data.data[`description_${lang}` as keyof ProductDetailType]
                )}
              />
              <Typography variant="h4" sx={{ color: Colors.orange, display: "None" }}>
                {sumFormatter(data.data.price)}
              </Typography>
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  margin: "20px 0",
                }}
              >
                <Stack
                  sx={{
                    ...FlexBox,
                    border: `1px solid ${Colors.headerBorder}`,
                    marginRight: "5px",
                    height: "40px",
                  }}
                >
                  <IconButton onClick={handleDecrement}>
                    <DecrementIcon />
                  </IconButton>

                  <Typography sx={{ margin: "0 5px", fontWeight: 600 }}>
                    {counter}
                  </Typography>
                  <IconButton onClick={handleIncrement}>
                    <IncrementIcon />
                  </IconButton>
                </Stack>

                <Stack
                  sx={{
                    ...FlexBox,
                    background: Colors.orange,
                    height: "40px",
                    padding: { xs: "0 10px", sm: "0 30px" },
                    color: "white",
                    cursor: "not-allowed",
                  }}
                // onClick={handleAddToCart}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    {translate("shop.add_to_cart", lang)}
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    ...FlexBox,
                    background: Colors.orange,
                    height: "40px",
                    padding: { xs: "0 10px", sm: "0 30px" },
                    color: "white",
                    cursor: "not-allowed",
                    marginLeft: "5px",
                  }}
                // onClick={handleGoToCheckout}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    {translate("shop.go_to_checkout", lang)}
                  </Typography>
                </Stack>
              </Stack>
              <MiniText bold="Brand" simple={data.data?.brand?.name ?? ""} />
              <MiniText
                bold="Type"
                simple={
                  String(
                    data.data.type[`name_${lang}` as keyof productDetailTypes]
                  ) ?? ""
                }
              />
              <MiniText
                bold="Origin"
                simple={
                  String(
                    data.data[`origin_${lang}` as keyof ProductDetailType]
                  ) ?? ""
                }
              />
              <MiniText bold="Length" simple={String(data.data.length)} />
              <MiniText bold="Width" simple={String(data.data.width)} />
              <MiniText bold="Height" simple={String(data.data.height)} />
            </Grid>
          </Grid>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "right",
              width: "100%",
              marginTop: "30px",
            }}
          >
            <ShareComponent text={data.data.name} />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default ProductDetailComponent;

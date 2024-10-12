import { Stack, SxProps, Typography, keyframes } from "@mui/material";
import { ReactElement, useContext } from "react";
import Link from "next/link";
import { Colors } from "@/utils/consts";
import CustomImage from "./CustomImage";
import { CardIcon, LikeIcon } from "@/assets/icons";
import { AuthContext } from "@/context";
import { deleter, poster } from "@/utils/functions";
import { NodeNextRequest } from "next/dist/server/base-http/node";
type Props = {
  img: string;
  title: string;
  id: number;
  status: string;
  type: string;
  price: string;
  inSwiper?: boolean;
  sx?: SxProps;
};
const ProductItem = ({
  img,
  title,
  id,
  status,
  type,
  price,
  inSwiper,
  sx,
}: Props): ReactElement => {
  const { favoriteProducts, setFavoriteProducts, setCartProducts } =
    useContext(AuthContext);
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
        const filter = favoriteProducts.data?.filter(
          (e) => e.id != Number(productId)
        );
        setFavoriteProducts({ ...favoriteProducts, data: filter });
      }
    }
  };
  const rightIconStyles: SxProps = {
    position: "absolute",
    right: inSwiper ? 5 : 13,
    top: inSwiper ? 5 : 13,
    borderRadius: "50%",
    cursor: "pointer",
    background: Colors.headerBorder,
    width: "25px",
    height: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const cardAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

  const handleToCart = async (productId: number) => {
    const result = await poster(
      "shop/add_to_cart/",
      { product: productId, quantity: 1 },
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

  return (
    <Stack
      sx={{
        width: "350px",
        height: "370px",
        borderRadius: "10px",
        WebkitBoxShadow: "0 13px 32px rgba(51, 51, 51, 0.1)",
        boxShadow: "0 13px 32px rgba(51, 51, 51, 0.1)",
        position: "relative",
        animation: `${cardAnimation} 0.5s 0.3s ease forwards`,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 13px 32px rgba(51, 51, 51, 0.3)",
        },
        "& a": {
          width: "100%",
          height: "100%",
          textDecoration: "none",
        },
        ...sx,
      }}
    >
      <Stack
        sx={{
          ...rightIconStyles,
        }}
        onClick={() => handleLIke(id)}
      >
        <LikeIcon liked={isLiked(id)} />
      </Stack>

      <Stack
        sx={{
          ...rightIconStyles,
          top: inSwiper ? 33 : 41,
        }}
        onClick={() => handleToCart(id)}
      >
        <CardIcon />
      </Stack>
      <Link href={`/shop/${id}`}>
        <Typography
          sx={{
            position: "absolute",
            top: `${inSwiper ? 5 : 13}px !important`,
            left: inSwiper ? 5 : 15,
            background: Colors.green,
            borderRadius: "10px",
            padding: "2px 4px",
            color: "white",
            fontSize: "12px",
            fontWeight: 600,
            zIndex: 2,
          }}
        >
          {status}
        </Typography>

        <CustomImage
          sx={{
            width: "100%",
            height: "70%",
            overflow: "hidden",
            padding: inSwiper ? 0 : "10px",
          }}
          src={img}
          alt={title}
          imageStyle={{
            borderRadius: "10px",
            width: "100%",
          }}
        />

        <Stack
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontSize: { xs: "12px" },
              lineHeight: { xs: "12px" },
              color: Colors.headerBorder,
              marginTop: "10px",
            }}
          >
            {type}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: Colors.black,
              fontWeight: 500,
              textTransform: "uppercase",
              fontSize: { xs: "18px" },
              lineHeight: { xs: "18px" },
              margin: "10px 5px",
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: Colors.orange,
              fontWeight: 500,
              fontSize: { xs: "16px" },
              lineHeight: { xs: "16px" },
              display: "None",
            }}
          >
            {price}
          </Typography>
        </Stack>
      </Link>
    </Stack>
  );
};

export default ProductItem;

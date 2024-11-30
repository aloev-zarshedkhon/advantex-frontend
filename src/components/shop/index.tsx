import { FlexBox, pageContainer } from "@/utils/globalStyles";
import {
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import Filter from "./Filters";
import { Colors } from "@/utils/consts";
import ProductItem from "../reusable/ProductItem";
import { CancelIcon } from "@/assets/icons";
import { theme } from "@/config/theme";
import DrawerWrapper from "../header/drawer/DrawerWrapper";
import { useRouter } from "next/router";
import { getter, sumFormatter, translate } from "@/utils/functions";
import { AllProductsResponseData, ProductType } from "@/types/product";
import Loading from "../reusable/loading";
import ItemNotFound from "../reusable/ItemNotFound";
import { AuthContext } from "@/context";
import ShoweMoreBtn from "../reusable/SHowMoreBtn";
import { BrandsResultItem } from "@/types/brand";
import { AllTypesResponseData } from "@/types/types";

type dataType = {
  load: boolean;
  data?: AllProductsResponseData;
  error?: boolean;
};

const ShopComponent = (): ReactElement => {
  const { lang, industriesData } = useContext(AuthContext);
  const [brands, setBrands] = useState<BrandsResultItem[]>();
  const [types, setTypes] = useState<AllTypesResponseData[]>();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [checkedBrands, setCheckedBrands] = useState<number[]>([]);
  const [checkedTypes, setCheckedTypes] = useState<number[]>([]);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [data, setData] = useState<dataType>({
    load: false,
    data: undefined,
    error: false,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down(900));
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (Object.values(router.query).length > 0) {
        setData({ ...data, load: true });
        let queryString = "?";

        const { text, product_type } = router.query;
        const parsedtext = text ? text.toString() : undefined;

        if (parsedtext) {
          queryString += `search=${parsedtext}&`;
        }
        if (product_type) {
          const find = checkedTypes.find((e) => e == Number(product_type));
          if (!find) {
            setCheckedTypes((prevCheckedTypes) => [
              ...prevCheckedTypes,
              Number(product_type),
            ]);
          }
          queryString += `types=${product_type}`;
        }
        const result = await getter(`shop/product${queryString}`);

        if (result.ok && result?.data) {
          const { count, next, previous, results } = result.data;
          setData({
            load: false,
            data: {
              count,
              next,
              previous,
              results: [...(data?.data?.results ?? []), ...results],
            },
            error: false,
          });
        } else {
          setData({ load: false, data: undefined, error: true });
        }
      }
    })();
  }, [router]);

  const nextPage = async (pageNum: number) => {
    const result = await getter(`shop/product?page=${pageNum}`);

    if (result.ok && result?.data) {
      const { count, next, previous, results } = result.data;
      setData({
        load: false,
        data: {
          count,
          next,
          previous,
          results: [...(data?.data?.results ?? []), ...results],
        },
        error: false,
      });
    } else {
      setData({ load: false, data: undefined, error: true });
    }
  };

  useEffect(() => {
    (async () => {
      const result = await getter("shop/brands");
      if (result.ok && result.data) {
        setBrands(result.data);
      }

      const typesData = await getter("shop/product_type");
      if (typesData.ok && typesData.data) {
        setTypes(typesData.data);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    let queryString = "?";

    if (checkedItems.length) {
      queryString += `industries=${checkedItems.join()}&`;
    }

    if (checkedBrands.length) {
      queryString += `brands=${checkedBrands.join()}&`;
    }

    if (checkedTypes.length) {
      queryString += `types=${checkedTypes.join()}&`;
    }
    if (!queryString.length) {
      return;
    }
    const result = await getter(
      `shop/product${queryString.substring(0, queryString.length - 1)}`
    );

    if (result.ok && result.data) {
      setData({ load: false, data: result.data, error: false });
    }
    setOpenFilter(false);
  };
  const handleToggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <Stack sx={pageContainer}>
      {data.load && !data?.data?.results?.length && <Loading />}
      {data.error && <ItemNotFound />}
      {/* {router.query.text && (
        <Stack>
          <Stack sx={{ ...FlexBox, margin: "20px 0" }}>
            <Typography variant="h4">
              {translate("shop.search_results", lang)}
            </Typography>
            <Stack sx={ContrasButton} onClick={handleSearchBarClose}>
              <Typography> {translate("shop.clear", lang)}</Typography>
              <CancelIcon />
            </Stack>
          </Stack>
          <Stack
            sx={{
              marginBottom: "30px",
            }}
          >
            {searchedProducts && searchedProducts.length > 0 ? (
              // <FavoriteProducts
              //   items={searchedProducts}
              //   ignoreText
              //   clearPadding
              // />
              <></>
            ) : (
              <Stack
                sx={{
                  margin: "20px auto",
                  color: Colors.red,
                  fontSize: "20px",
                }}
              >
                {translate("checkout.nothing_found", lang)}
              </Stack>
            )}
          </Stack>
        </Stack>
      )} */}
      {data.data && (
        <>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {!isMobile && (
              <Grid
                item
                xs={2.5}
                sx={{
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <Filter
                  items={industriesData.data ?? []}
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                  submit={handleSubmit}
                  brands={brands ?? []}
                  checkedbrands={checkedBrands}
                  setCheckedBrands={setCheckedBrands}
                  types={types ?? []}
                  checkedTypes={checkedTypes}
                  setCheckedTypes={setCheckedTypes}
                />
              </Grid>
            )}

            <Grid item xs={isMobile ? 12 : 9}>
              <Stack
                sx={{
                  ...FlexBox,
                  justifyContent: "left",
                  padding: "0 20px",
                  cursor: "pointer",
                }}
                onClick={handleToggleFilter}
              >
                <Typography>{translate("shop.filter", lang)}</Typography>
              </Stack>
              <Grid container>
                {data.data.results?.map((e, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    lg={4}
                    sx={{
                      padding: { xs: "10px 5px", sm: "10px", md: "10px 15px" },
                      margin: { xs: "0 auto", sm: 0 },
                    }}
                  >
                    <ProductItem
                      id={e.id}
                      img={e.main_image?.image ?? ""}
                      title={e.name}
                      status={String(
                        e.type[`name_${lang}` as keyof ProductType] ?? ""
                      )}
                      type={String(
                        e.type[`name_${lang}` as keyof ProductType] ?? ""
                      )}
                      price={sumFormatter(e.price)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Stack>
                {data.data.next && (
                  <ShoweMoreBtn
                    setPage={() => {
                      const page = data.data?.next
                        ?.split("page=")?.[1]
                        ?.split("&")?.[0];

                      nextPage(Number(page));
                    }}
                    loading={data.load}
                  />
                )}
              </Stack>
            </Grid>
          </Grid>
          <DrawerWrapper
            open={isMobile && openFilter}
            toggleClose={handleToggleFilter}
            anchor="left"
            xsWidth="90%"
          >
            <Stack sx={{ padding: "15px" }}>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  margin: "50px 0 30px 0",
                }}
              >
                <Typography variant="h4" sx={{ color: Colors.red }}>
                  {translate("shop.filter", lang)}
                </Typography>
                <IconButton onClick={handleToggleFilter}>
                  <CancelIcon />
                </IconButton>
              </Stack>
              <Filter
                items={industriesData.data ?? []}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                submit={handleSubmit}
                brands={brands ?? []}
                checkedbrands={checkedBrands}
                setCheckedBrands={setCheckedBrands}
                types={types ?? []}
                checkedTypes={checkedTypes}
                setCheckedTypes={setCheckedTypes}
              />
            </Stack>
          </DrawerWrapper>
        </>
      )}
    </Stack>
  );
};

export default ShopComponent;

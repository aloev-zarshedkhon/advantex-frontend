import { Stack, Typography, useMediaQuery } from "@mui/material";
import { ReactElement, useContext } from "react";
import TextBorderBottom from "../reusable/TextBorderBottom";
import ProductItem from "../reusable/ProductItem";
import { pageContainer } from "@/utils/globalStyles";
import { Product, ProductType } from "@/types/product";
import { AuthContext } from "@/context";
import { sumFormatter, translate } from "@/utils/functions";
import { Colors } from "@/utils/consts";
import { theme } from "@/config/theme";
import SliderWrapper from "../reusable/SliderWrapper";

type Props = {
  items: Product[];
  ignoreText?: boolean;
  clearPadding?: boolean;
  text?: string;
};

const FavoriteProducts = ({
  items,
  ignoreText,
  clearPadding,
  text,
}: Props): ReactElement => {
  const { lang } = useContext(AuthContext);
  const xs = useMediaQuery(theme.breakpoints.between(0, 800));
  const md = useMediaQuery(theme.breakpoints.between(900, 921));
  const xl = useMediaQuery(theme.breakpoints.up(1400));

  const generateSlidesShowCount = (): number => {
    const itemsCount = items.length;
    if (xs || md) {
      return 1;
    }
    if (xl) {
      return itemsCount > 2 ? 3 : itemsCount;
    }
    return itemsCount > 1 ? 2 : itemsCount;
  };

  return (
    <Stack
      component="div"
      id="favorite-products"
      sx={{
        ...pageContainer,
        padding: {
          xs: `20px ${clearPadding ? 0 : 10}px 0 ${clearPadding ? 0 : 10}px`,
          md: `30px ${clearPadding ? 0 : 50}px 0 ${clearPadding ? 0 : 50}px`,
          lg: `40px ${clearPadding ? 0 : 60}px 0 ${clearPadding ? 0 : 60}px`,
        },
      }}
    >
      {!ignoreText && items.length > 0 && (
        <TextBorderBottom text={text ?? translate("home.popular", lang)} />
      )}
      {text && items.length == 0 && (
        <Typography
          variant="h4"
          sx={{ margin: "30px auto", fontWeight: "bold", color: Colors.red }}
        >
          {translate("profile.nothing", lang)}
        </Typography>
      )}
      {items.length > 0 && (
        <SliderWrapper
          fade={false}
          slidesToShow={generateSlidesShowCount()}
          variableWidth={true}
          sx={{
            "& .slick-arrow": {
              display: "none",
            },
          }}
        >
          {items.map((e, index) => (
            <Stack
              key={index}
              sx={{
                padding: { xs: "10px", sm: "10px 20px", md: "20px 30px" },
                margin: { xs: "20px 0", sm: "10px 0" },
                width: "350px",
                position: "relative",
              }}
            >
              <ProductItem
                img={e.main_image?.image ?? ""}
                type={String(e.type[`name_${lang}` as keyof ProductType])}
                status={e.status}
                price={sumFormatter(e.price)}
                title={e.name}
                id={e.id}
              />
            </Stack>
          ))}
        </SliderWrapper>
      )}
    </Stack>
  );
};

export default FavoriteProducts;

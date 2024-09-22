import { Grid, Stack } from "@mui/material";
import { ReactElement, useContext } from "react";
import TextBorderBottom from "../reusable/TextBorderBottom";
import BeltItem from "./belt/BeltItem";
import GridWrapper from "../reusable/GridWrapper";
import { AuthContext } from "@/context";
import { AllIndustriesResponseData } from "@/types/industry";
import { pageContainer } from "@/utils/globalStyles";
import { translate } from "@/utils/functions";
import CardSkeleton from "../reusable/cardSkeleton";

const IndustriesSection = (): ReactElement => {
  const { lang, industriesData } = useContext(AuthContext);

  return (
    <Stack
      component="div"
      id="favorite-products"
      sx={{
        ...pageContainer,
        padding: {
          xs: "20px 10px 0 10px",
          md: "30px 50px 0 50px",
          lg: "40px 60px 0 60px",
        },
      }}
    >
      <TextBorderBottom text={translate("home.industry", lang)} />
      {industriesData.data ? (
        <Grid container>
          {industriesData.data.map((e, index) => (
            <GridWrapper key={index} lg={3}>
              <BeltItem
                title={String(
                  e[`name_${lang}` as keyof AllIndustriesResponseData]
                )}
                url={e.slug}
                img={e.image?.image ?? ""}
              />
            </GridWrapper>
          ))}
        </Grid>
      ) : (
        <Grid container>
          {"a"
            .repeat(4)
            .split("")
            .map((_, index) => (
              <GridWrapper key={index} lg={3}>
                <CardSkeleton />
              </GridWrapper>
            ))}
        </Grid>
      )}
    </Stack>
  );
};

export default IndustriesSection;

import TextBorderBottom from "@/components/reusable/TextBorderBottom";
import { Grid, Stack } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import BeltItem from "./BeltItem";
import GridWrapper from "@/components/reusable/GridWrapper";
import { pageContainer } from "@/utils/globalStyles";
import { AuthContext } from "@/context";
import { AllTypesResponseData } from "@/types/types";
import { getter, translate } from "@/utils/functions";
import CardSkeleton from "@/components/reusable/cardSkeleton";

const BeltsSection = (): ReactElement => {
  const { lang } = useContext(AuthContext);
  const [data, setData] = useState<AllTypesResponseData[]>();

  useEffect(() => {
    const getValues = async () => {
      const result = await getter("shop/product_type");
      if (result.ok && result?.data) {
        setData(result.data);
      }
    };
    getValues();
  }, []);

  return (
    <Stack
      component="div"
      id="belt-types"
      sx={{
        ...pageContainer,
        padding: {
          xs: "20px 10px 0 10px",
          md: "30px 50px 0 50px",
          lg: "40px 60px 0 60px",
        },
      }}
    >
      <TextBorderBottom text={translate("home.belt", lang)} />

      <Grid container>
        {data
          ? data.map((e, index) => (
              <GridWrapper key={index} lg={3}>
                <BeltItem
                  title={String(
                    e[`name_${lang}` as keyof AllTypesResponseData]
                  )}
                  img={e.image?.image}
                  isBelt
                  id={e.id}
                />
              </GridWrapper>
            ))
          : "a"
              .repeat(4)
              .split("")
              .map((_, index) => (
                <GridWrapper key={index} lg={3}>
                  <CardSkeleton />
                </GridWrapper>
              ))}
      </Grid>
    </Stack>
  );
};

export default BeltsSection;

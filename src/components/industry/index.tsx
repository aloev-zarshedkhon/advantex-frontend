import { Grid, Stack } from "@mui/material";
import { ReactElement, useContext } from "react";
import TextBorderBottom from "../reusable/TextBorderBottom";
import { pageContainer } from "@/utils/globalStyles";
import GridWrapper from "../reusable/GridWrapper";
import BeltItem from "../home/belt/BeltItem";
import { AllIndustriesResponseData } from "@/types/industry";
import Loading from "../reusable/loading";
import ItemNotFound from "../reusable/ItemNotFound";
import { AuthContext } from "@/context";
import { translate } from "@/utils/functions";

const IndustryComponent = (): ReactElement => {
  const { lang, industriesData } = useContext(AuthContext);

  return (
    <Stack sx={pageContainer}>
      {industriesData.load && <Loading />}
      {industriesData.error && <ItemNotFound />}
      {industriesData.data && (
        <Stack>
          <TextBorderBottom text={translate("home.industry", lang)} />
          <Grid container>
            {industriesData.data.map((e, ind) => (
              <GridWrapper key={ind}>
                <BeltItem
                  title={String(
                    e[`name_${lang}` as keyof AllIndustriesResponseData]
                  )}
                  url={e.slug}
                  img={e.image?.image}
                />
              </GridWrapper>
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
};

export default IndustryComponent;

import { Grid, Stack, Typography } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import CustomImage from "../reusable/CustomImage";
import ShareComponent from "../reusable/SHareComponent";
import ItemNotFound from "../reusable/ItemNotFound";
import { pageContainer } from "@/utils/globalStyles";
import TextBorderBottom from "../reusable/TextBorderBottom";
import { getter, translate } from "@/utils/functions";
import {
  AllIndustriesResponseData,
  IndustryDetailResponseData,
} from "@/types/industry";
import Loading from "../reusable/loading";
import { AuthContext } from "@/context";
import BeltItem from "../home/belt/BeltItem";
import GridWrapper from "../reusable/GridWrapper";
import HtmlContent from "../reusable/HtmlContent";
import FavoriteProducts from "../home/FavoriteProducts";

type Props = {
  slug: string;
};

type dataType = {
  load: boolean;
  data?: IndustryDetailResponseData;
  error?: boolean;
};
const IndustryDetailComponent = ({ slug }: Props): ReactElement => {
  const { lang } = useContext(AuthContext);
  const [data, setData] = useState<dataType>();
  useEffect(() => {
    const getValues = async () => {
      setData({ load: true });
      const result = await getter(`shop/industry/${slug}`);
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
  }, [slug]);

  return (
    <Stack sx={pageContainer}>
      {data?.load && <Loading />}
      {data?.error && <ItemNotFound />}
      {data?.data && (
        <Stack>
          <TextBorderBottom
            text={String(
              data.data[`name_${lang}` as keyof IndustryDetailResponseData]
            )}
          />

          {data.data?.image && (
            <CustomImage
              src={data.data.image?.image}
              alt={data.data.image?.description}
              sx={{
                width: "100%",
                maxWidth: "100%",
                margin: "20px auto",
                height: { xs: "200px", sm: "250px", md: "300px", lg: "350px" },
              }}
              imageStyle={{
                width: "100%",
                height: "100%",
              }}
            />
          )}

          <Stack>
            <HtmlContent
              content={String(
                data.data[
                  `description_${lang}` as keyof IndustryDetailResponseData
                ]
              )}
            />
          </Stack>

          {data.data.children.length > 0 && (
            <Stack>
              <Stack sx={{ marginTop: "50px" }}>
                <TextBorderBottom text={translate("industry.sub", lang)} />
              </Stack>
              <Grid container>
                {data.data.children.map((e, ind) => (
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
          <FavoriteProducts items={data.data.products ?? []} clearPadding />

          <Stack
            sx={{ display: "flex", justifyContent: "right", width: "100%" }}
          >
            <ShareComponent
              text={String(
                data.data[`name_${lang}` as keyof IndustryDetailResponseData]
              )}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default IndustryDetailComponent;

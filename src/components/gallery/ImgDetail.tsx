import { Grid, Stack, Typography } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import GalleryImgItem from "./ImgItem";
import ItemNotFound from "../reusable/ItemNotFound";
import { pageContainer } from "@/utils/globalStyles";
import GridWrapper from "../reusable/GridWrapper";
import { GalleryResponseData } from "@/types/gallery";
import { getter } from "@/utils/functions";
import Loading from "../reusable/loading";
import { AuthContext } from "@/context";
import HtmlContent from "../reusable/HtmlContent";

type Props = {
  id: number;
};

type dataType = {
  load: boolean;
  data?: GalleryResponseData;
  error?: boolean;
};
const GalleryDetailComponent = ({ id }: Props): ReactElement => {
  const { lang } = useContext(AuthContext);
  const [data, setData] = useState<dataType>();
  useEffect(() => {
    (async () => {
      setData({ load: true });
      const result = await getter(`gallery/${id}`);
      if (result.ok && result?.data) {
        setData({
          load: false,
          data: result.data,
          error: false,
        });
      } else {
        setData({ load: false, data: undefined, error: true });
      }
    })();
  }, [id]);

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
          <Typography variant="h1" sx={{ fontWeight: 500 }}>
            {String(data.data[`title_${lang}` as keyof GalleryResponseData])}
          </Typography>

          <Stack>
            <HtmlContent
              content={String(
                data.data[`description_${lang}` as keyof GalleryResponseData]
              )}
            />
          </Stack>

          <Grid container>
            {data.data?.images.map((e, ind) => (
              <GridWrapper key={ind} md={6} lg={4} sx={{ padding: "10px" }}>
                <GalleryImgItem img={e?.image} />
              </GridWrapper>
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
};

export default GalleryDetailComponent;

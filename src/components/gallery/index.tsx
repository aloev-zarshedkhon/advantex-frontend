import { Colors } from "@/utils/consts";
import { Grid, Stack, Typography } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import GalleryImgItem from "./ImgItem";
import Link from "next/link";
import GridWrapper from "../reusable/GridWrapper";
import { pageContainer } from "@/utils/globalStyles";
import { getter } from "@/utils/functions";
import { AllGalleryResponseData, GalleryResultItem } from "@/types/gallery";
import Loading from "../reusable/loading";
import ItemNotFound from "../reusable/ItemNotFound";
import ShoweMoreBtn from "../reusable/SHowMoreBtn";
import { AuthContext } from "@/context";

type dataType = {
  load: boolean;
  data?: AllGalleryResponseData;
  error?: boolean;
};
const GalleryImages = (): ReactElement => {
  const { lang } = useContext(AuthContext);
  const [data, setData] = useState<dataType>({
    load: false,
    data: undefined,
    error: false,
  });
  const [page, setpage] = useState<number>(1);

  useEffect(() => {
    const getValues = async () => {
      setData({ ...data, load: true });
      const result = await getter(`gallery?page=${page}`);
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
    getValues();
  }, [page]);
  return (
    <Stack sx={pageContainer}>
      {data.load && !data?.data?.results.length && <Loading />}
      {data.error && <ItemNotFound />}
      {data.data && (
        <Stack>
          <Grid container>
            {data.data.results.map((e, ind) => (
              <GridWrapper
                key={ind}
                sx={{
                  padding: "10px",
                  "& a": {
                    display: "block",
                    textDecoration: "none",
                    width: "100%",
                    height: "100%",
                  },
                }}
                md={6}
              >
                <Link href={`/gallery/${e.id}`}>
                  <GalleryImgItem img={e?.image} disableClick />
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 500,
                      color: Colors.black,
                      marginTop: "30px",
                    }}
                  >
                    {e[`title_${lang}` as keyof GalleryResultItem]}
                  </Typography>
                </Link>
              </GridWrapper>
            ))}
          </Grid>
          {data.data.next && (
            <ShoweMoreBtn
              setPage={() => setpage(Number(data.data?.next?.split("=")?.[1]))}
              loading={data.load}
            />
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default GalleryImages;

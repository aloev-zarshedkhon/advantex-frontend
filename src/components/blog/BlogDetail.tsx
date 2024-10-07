import { Colors } from "@/utils/consts";
import { Grid, Stack, SxProps, Typography } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import CustomImage from "../reusable/CustomImage";
import ShareComponent from "../reusable/SHareComponent";
import ItemNotFound from "../reusable/ItemNotFound";
import { pageContainer } from "@/utils/globalStyles";
import { BlogResponseData } from "@/types/blogItem";
import { dateFormatter } from "@/utils/functions";
import GridWrapper from "../reusable/GridWrapper";
import GalleryImgItem from "../gallery/ImgItem";
import HtmlContent from "../reusable/HtmlContent";
import { AuthContext } from "@/context";
import { useRouter } from "next/router";

type Props = {
  ok: boolean;
  data?: BlogResponseData;
};

const BlogDetailComponent = (blogFromServer: Props): ReactElement => {
  const { lang } = useContext(AuthContext);
  const [langChangeCount, setLangChangeCount] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    setLangChangeCount((prev) => prev + 1);
  }, [lang]);
  useEffect(() => {
    if (langChangeCount > 2) {
      router.push("/blog");
    }
  }, [langChangeCount]);
  const LineStyle: SxProps = {
    display: "block",
    content: '""',
    width: `${(blogFromServer?.data?.created_at?.length ?? 20) * 5}px`,
    maxWidth: { xs: "80px", sm: "150px" },
    height: "1px",
    background: Colors.headerBorder,
  };

  return (
    <Stack>
      {!blogFromServer?.ok && <ItemNotFound />}
      {blogFromServer?.data && blogFromServer?.ok && (
        <Stack
          sx={{
            ...pageContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 600,
              textAlign: "center",
              margin: "30px 0 10px 0",
            }}
          >
            {blogFromServer.data.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: Colors.headerBorder,
              margin: "10px 0",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              "&::after": { ...LineStyle, marginLeft: "30px" },
              "&::before": {
                ...LineStyle,
                marginRight: "30px",
              },
            }}
          >
            {dateFormatter(blogFromServer.data.created_at)}
          </Typography>
          {blogFromServer.data?.main_image.image && (
            <CustomImage
              src={blogFromServer.data.main_image?.image}
              alt={blogFromServer.data.title}
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

          <HtmlContent content={blogFromServer.data.body} />
          <Grid container>
            {blogFromServer.data.images.map((e, ind) => (
              <GridWrapper key={ind}>
                <GalleryImgItem img={e?.image} />
              </GridWrapper>
            ))}
          </Grid>
          <Stack
            sx={{ display: "flex", justifyContent: "right", width: "100%" }}
          >
            <ShareComponent text={blogFromServer.data?.title ?? ""} />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default BlogDetailComponent;

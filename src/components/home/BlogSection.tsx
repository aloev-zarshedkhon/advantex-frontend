import { Grid, Stack } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import TextBorderBottom from "../reusable/TextBorderBottom";
import BlogWrapper from "../blog/BlogWrapper";
import { pageContainer } from "@/utils/globalStyles";
import { getter, translate } from "@/utils/functions";
import GridWrapper from "../reusable/GridWrapper";
import CardSkeleton from "../reusable/cardSkeleton";
import { AuthContext } from "@/context";
import { AllBlogResult } from "@/types";

const BlogSection = (): ReactElement => {
  const { lang } = useContext(AuthContext);
  const [data, setData] = useState<AllBlogResult[]>();
  const [customLang, setCustomLang] = useState<string>();

  useEffect(() => {
    const getValues = async () => {
      const result = await getter(`blog?lang=${customLang}`);
      if (result.ok && result?.data) {
        setData(result.data.results);
      }
    };

    if (customLang) {
      getValues();
    }
  }, [customLang]);

  useEffect(() => {
    setCustomLang(lang);
  }, [lang]);
  return (
    <Stack
      component="div"
      id="blogs"
      sx={{
        ...pageContainer,
        padding: {
          xs: "20px 10px",
          md: "30px 50px",
          lg: "40px 60px",
        },
      }}
    >
      <TextBorderBottom text={translate("home.blog", lang)} />
      {data ? (
        <BlogWrapper items={data} />
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

export default BlogSection;

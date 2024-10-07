import { Stack } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import BlogWrapper from "./BlogWrapper";
import { pageContainer } from "@/utils/globalStyles";
import { getter } from "@/utils/functions";
import Loading from "../reusable/loading";
import ItemNotFound from "../reusable/ItemNotFound";
import ShoweMoreBtn from "../reusable/SHowMoreBtn";
import { AuthContext } from "@/context";
import { AllBlogResponseData } from "@/types";

type dataType = {
  load: boolean;
  data?: AllBlogResponseData;
  error?: boolean;
  lang?: string;
};
const BlogComponent = (): ReactElement => {
  const { lang } = useContext(AuthContext);
  const [data, setData] = useState<dataType>({
    load: false,
    data: { count: 0, next: null, previous: null, results: [] },
    error: false,
    lang: lang,
  });
  const [page, setpage] = useState<number>(1);
  const [customLang, setCustomLang] = useState<string>();

  useEffect(() => {
    const getValues = async () => {
      setData({
        data: data.data,
        load: true,
        lang: customLang,
      });
      const result = await getter(`blog?page=${page}&lang=${customLang}`);
      if (result.ok && result?.data) {
        const { count, next, previous, results } = result.data;
        setData({
          load: false,
          data: {
            count,
            next,
            previous,
            results: [
              ...(data?.data?.results && data.lang === customLang
                ? data.data.results
                : []),
              ...results,
            ],
          },
          error: false,
          lang: customLang,
        });
      } else {
        setData({
          load: false,
          data: undefined,
          error: true,
        });
      }
    };
    if (customLang) {
      getValues();
    }
  }, [page, customLang]);

  useEffect(() => {
    setCustomLang(lang);
  }, [lang]);

  return (
    <Stack sx={pageContainer}>
      {data.error ||
        (data.data &&
          !data.load &&
          data.data.results &&
          data.data.results.length == 0 && <ItemNotFound />)}

      {data.data && data.data.results && data.data.results.length > 0 && (
        <>
          <BlogWrapper items={data.data.results} />
          {data.data.next && (
            <ShoweMoreBtn
              setPage={() =>
                setpage(Number(data.data?.next?.split("page=")?.[1]))
              }
              loading={data.load}
            />
          )}
        </>
      )}
      {data.load && !data?.data?.results.length && <Loading />}
    </Stack>
  );
};

export default BlogComponent;

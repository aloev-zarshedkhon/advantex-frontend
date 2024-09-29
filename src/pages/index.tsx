import HomeComponent from "@/components/home";
import SEO from "@/components/seo";
import { getter } from "@/utils/functions";
import { CompanyOptions } from "@/types/types";
import { GetServerSideProps } from "next";
type dataType = {
  ok: boolean;
  data?: CompanyOptions[];
};

function Home(data: dataType) {
  const findCurrentText = (key: string) => {
    try {
      if (data.ok && data.data) {
        const find = data.data.find((e) => e.key === key);
        return (find && find.value) || "";
      } else {
        return "";
      }
    } catch {
      return "";
    }
  };

  return (
    <>
      <SEO
        title={findCurrentText("title")}
        description={findCurrentText("description")}
        ogUrl={findCurrentText("url")}
        ogTitle={findCurrentText("sitename")}
        ogImg={findCurrentText("image")}
      />
      <HomeComponent />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: dataType;
}> = async () => {
  const result = await getter("company/options");

  return {
    props: {
      ok: result.ok,
      data: result.data,
    },
  };
};

export default Home;

import BlogDetailComponent from "@/components/blog/BlogDetail";
import SEO from "@/components/seo";
import { AuthContext } from "@/context";
import { BlogResponseData } from "@/types/blogItem";
import { Variables } from "@/utils/consts";
import { getter, translate } from "@/utils/functions";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";

type dataType = {
  ok: boolean;
  data?: BlogResponseData;
};
function BlogDetail(blogFromServer: dataType) {
  const { lang } = useContext(AuthContext);
  const router = useRouter();
  const slug = router.query?.slug;

  return (
    <>
      <SEO
        title={blogFromServer.data?.title ?? translate("404.title", lang)}
        description={blogFromServer.data?.body ?? translate("404.desc", lang)}
        ogUrl={`blog/${slug}`}
        ogTitle={blogFromServer.data?.title ?? ""}
        ogImg={blogFromServer.data?.main_image.image ?? ""}
      />
      {slug && (
        <BlogDetailComponent
          ok={blogFromServer.ok}
          data={blogFromServer.data}
        />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: dataType;
}> = async (slug) => {
  const lang =
    slug.req.headers.cookie?.split("lang=")?.[1] || Variables.defaultLang;
  const result = await getter(`blog/${slug.query.slug}?lang=${lang}`);

  return {
    props: {
      ok: result.ok,
      data: result.data,
    },
  };
};

export default BlogDetail;

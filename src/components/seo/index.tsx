import Head from "next/head";
import { ReactElement } from "react";

interface Props {
  title: string;
  description: string;
  ogUrl: string;
  ogTitle: string;
  ogImg: string;
}

const SEO = ({
  title,
  description,
  ogUrl,
  ogTitle,
  ogImg,
}: Props): ReactElement => {
  return (
    <Head>
      <title>{title + " - " + "advantex.uz"}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href="https://advantex.uz" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={ogTitle + " - " + "advantex.uz"} />
      <meta property="og:description" content={description} />

      <meta property="og:url" content={"https://advantex.uz/" + ogUrl} />
      <meta property="og:site_name" content="Advantex" />
      {/* <meta property="article:tag" content={tag} /> */}
      {/* <meta property="article:section" content="Section" /> */}
      <meta property="og:updated_time" content={new Date().toISOString()} />
      <meta property="og:image" content={ogImg} />
      <meta name="robots" content="index, archive" />
    </Head>
  );
};

export default SEO;

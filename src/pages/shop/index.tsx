import Head from "next/head";
import ShopComponent from "@/components/shop";

export default function Shop() {
  return (
    <>
      <Head>
        <title>Shop page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ShopComponent />
    </>
  );
}

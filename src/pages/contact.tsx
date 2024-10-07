import Head from "next/head";
import ContactComponent from "@/components/contact";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContactComponent />
    </>
  );
}
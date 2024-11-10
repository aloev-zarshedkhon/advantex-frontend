import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { theme } from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import Header from "@/components/header";
import MainLayout from "@/components/layout/MainLayout";
import { AuthProvider } from "@/context";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Header />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

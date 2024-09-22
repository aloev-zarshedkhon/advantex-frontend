import { createTheme, Theme } from "@mui/material/styles";
import { NextFont } from "next/dist/compiled/@next/font";

import localFont from "next/font/local";

const customFont: NextFont = localFont({
  src: "../../public/mulish.ttf",
  display: "swap",
});

function getTheme(): Theme {
  let theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  theme = createTheme(theme, {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    typography: {
      fontFamily: [customFont.style.fontFamily, '"sans-serif"'].join(","),
      fontSize: "16px",
      allVariants: {
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      h1: {
        fontWeight: "700",
        fontSize: "32px",
        lineHeight: "40px",
        [theme.breakpoints.between("sm", "md")]: {
          fontSize: "28px",
          lineHeight: "35px",
        },
        [theme.breakpoints.between("xs", "sm")]: {
          fontSize: "25px",
          lineHeight: "30px",
        },
      },
      h2: {
        fontWeight: "700",
        fontSize: "24px",
        lineHeight: "30px",
        [theme.breakpoints.between("sm", "md")]: {
          fontSize: "22px",
          lineHeight: "27px",
        },
        [theme.breakpoints.between("xs", "sm")]: {
          fontSize: "20px",
          lineHeight: "25px",
        },
      },
      h3: {
        fontWeight: "600",
        fontSize: "20px",
        lineHeight: "25px",
        [theme.breakpoints.between("sm", "md")]: {
          fontSize: "18px",
          lineHeight: "12px",
        },
        [theme.breakpoints.between("xs", "sm")]: {
          fontSize: "16px",
          lineHeight: "20px",
        },
      },
      h4: {
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "20px",
        [theme.breakpoints.between("sm", "md")]: {
          fontSize: "15px",
          lineHeight: "18px",
        },
        [theme.breakpoints.between("xs", "sm")]: {
          fontSize: "14px",
          lineHeight: "16px",
        },
      },
      h5: {
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "19px",
        [theme.breakpoints.between("xs", "sm")]: {
          fontSize: "13px",
          lineHeight: "16px",
        },
      },
      h6: {
        fontWeight: "300",
        fontSize: "13px",
        lineHeight: "17px",
        [theme.breakpoints.between("xs", "sm")]: {
          fontSize: "12px",
          lineHeight: "15px",
        },
      },
      paragraph: {
        fontSize: "12px",
        lineHeight: "18px",
      },
    },
  });
  return theme;
}

export const theme = getTheme();

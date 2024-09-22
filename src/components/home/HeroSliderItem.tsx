import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { ReactElement } from "react";
import CustomImage from "../reusable/CustomImage";
interface HeroSliderItemProps {
  label: string;
  title: string;
  description: string;
  btnText: string;
  btnUrl: string;
  bgImg: string;
  active?: boolean;
}

const HeroSliderItem = ({
  label,
  title,
  description,
  btnText,
  btnUrl,
  bgImg,
  active,
}: HeroSliderItemProps): ReactElement => {
  const generateTransition = (num: number) => {
    try {
      const obj = {
        WebkitTransition: `all 0.${num}s ease 0.${num}s`,
        OTransition: `all 0.${num}s ease 0.${num}s`,
        transition: `all 0.${num}s ease 0.${num}s`,
        maxWidth: { xs: "80%", lg: num === 6 ? "40%" : "70%" },
      };
      return obj;
    } catch {
      return {};
    }
  };
  return (
    <Stack
      sx={{
        width: "100%",
        height: "500px",
        position: "relative",
      }}
    >
      <Stack
        sx={{
          padding: {
            xs: "40px",
            sm: "30px 60px",
            md: "25px 70px",
            lg: "33px 100px",
            xl: "42px 130px",
          },
          position: "absolute",
          left: 0,
          width: "inherit",
          height: "inherit",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#e7ab3c !important",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            lineHeight: "28px",
            display: "inline-block",
            position: "relative",
            ...generateTransition(2),
            top: active ? 0 : "50px",
            opacity: active ? 1 : 0,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            top: active ? 0 : "50px",
            opacity: active ? 1 : 0,
            color: "white",
            fontSize: "72px",
            fontWeight: 700,
            margin: "16px 0",
            position: "relative",
            ...generateTransition(4),
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            top: active ? 0 : "50px",
            opacity: active ? 1 : 0,
            fontSize: "16px",
            color: "white",
            fontWeight: 400,
            lineHeight: "26px",
            margin: "0 0 15px 0",
            ...generateTransition(6),
          }}
        >
          {description.substring(0, 300)}
        </Typography>
        <Stack sx={{ width: `${btnText.length * 20}px` }}>
          <Box
            component="button"
            sx={{
              top: active ? 0 : "50px",
              opacity: active ? 1 : 0,
              border: "none",
              display: "inline-block",
              fontSize: "13px",
              fontWeight: 600,
              padding: "12px 10px",
              color: "#ffffff",
              background: "#e7ab3c",
              textTransform: "uppercase",
              ...generateTransition(8),
              margin: "20px 0 0 0",
              "& a": {
                textDecoration: "none",
                color: "white",
              },
            }}
          >
            <Link href={btnUrl ?? "/"}>{btnText}</Link>
          </Box>
        </Stack>
      </Stack>

      <CustomImage
        src={bgImg}
        alt="slider item"
        sx={{
          widht: "100%",
          height: "100%",
          zIndex: -1,
        }}
        imageStyle={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </Stack>
  );
};

export default HeroSliderItem;

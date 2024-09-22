import {
  FacebookIcon,
  PinterestIcon,
  TwitterIcon,
} from "@/assets/icons/SocialIcons";
import { theme } from "@/config/theme";
import { AuthContext } from "@/context";
import { Colors } from "@/utils/consts";
import { translate } from "@/utils/functions";
import { pageContainer } from "@/utils/globalStyles";
import { Box, Stack, SxProps, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useContext } from "react";
export const FooterUrlIcon: SxProps = {
  width: "40px",
  height: "40px",
  marginRight: "5px",
  "& a": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
    width: "40px",
    background: "#434445",
    color: "#ffffff",
    lineHeight: "40px",
    borderRadius: "50%",
    marginRight: "7px",
    position: "relative",
    zIndex: 1,
    "&:hover": {
      "&::before": {
        opacity: 1,
      },
    },
    "&::before": {
      position: "absolute",
      left: "0",
      top: "0",
      height: "100%",
      width: "100%",
      background: "#e7ab3c",
      content: '""',
      borderRadius: "50%",
      opacity: 0,
      WebkitTransition: ["all 0.3s", "0.3s"],
      OTransition: "0.3s",
      transition: "0.3s",
      zIndex: -1,
    },
  },
};
const Footer = (): ReactElement => {
  const flex = useMediaQuery(theme.breakpoints.up(1000));
  const { lang, accessToken } = useContext(AuthContext);

  const FooterLeftLiStyle: SxProps = {
    listStyle: "none",
    color: "#b2b2b2",
    fontSize: "16px",
    lineHeight: "30px",
  };

  const FooterWidgetLiStyle: SxProps = {
    "& a": {
      lineHeight: "36px",
      fontSize: "16px",
      color: "#b2b2b2",
      textDecoration: "none",
    },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const emailValue = emailInput.value;
    alert(`email: ${emailValue}`);
  };
  return (
    <Stack
      sx={{
        width: "100%",
        background: Colors.footerBg,
        ...pageContainer,
        padding: {
          xs: "25px 7px",
          sm: "45px 30px",
          md: "55px 30px",
          lg: "60px 130px",
          xl: "70px 190px",
        },
      }}
    >
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: flex ? "row" : "column",
        }}
      >
        <Stack sx={{ width: flex ? "30%" : "100%" }}>
          <Stack
            sx={{
              "& a": {
                display: "inline-block",
              },
            }}
          >
            <Link href="/">
              <Image src="/images/logo.png" alt="logo" width={60} height={60} />
            </Link>
          </Stack>
          <Box
            component="ol"
            sx={{ listStyle: "none", margin: "20px 0", padding: 0 }}
          >
            <Box component="li" sx={FooterLeftLiStyle}>
              {translate("footer.addressText", lang)}:
              {translate("footer.addressContent", lang)}
            </Box>
            <Box component="li" sx={FooterLeftLiStyle}>
              {translate("footer.phone", lang)}:
              {translate("footer.phoneContent", lang)}
            </Box>
            <Box component="li" sx={FooterLeftLiStyle}>
              {translate("footer.email", lang)}:
              {translate("footer.emailContent", lang)}
            </Box>
          </Box>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Stack sx={FooterUrlIcon}>
              <FacebookIcon />
            </Stack>
            <Stack sx={FooterUrlIcon}>
              <TwitterIcon />
            </Stack>
            <Stack sx={FooterUrlIcon}>
              <PinterestIcon />
            </Stack>
          </Stack>
        </Stack>
        <Stack
          sx={{ width: flex ? "30%" : "100%", marginTop: flex ? 0 : "30px" }}
        >
          <Stack>
            <Typography
              sx={{ color: "#ffffff", fontWeight: 700, marginBottom: "26px" }}
            >
              {translate("footer.info.title", lang)}
            </Typography>
            <Box
              component="ul"
              sx={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              <Box component="li" sx={FooterWidgetLiStyle}>
                <Link href="/about">
                  {translate("footer.info.about", lang)}
                </Link>
              </Box>

              <Box component="li" sx={FooterWidgetLiStyle}>
                <Link href="/contact">
                  {translate("footer.info.contact", lang)}
                </Link>
              </Box>
            </Box>
          </Stack>
        </Stack>
        <Stack sx={{ width: flex ? "30%" : "100%" }}>
          <Stack>
            <Typography
              sx={{ color: "#ffffff", fontWeight: 700, marginBottom: "26px" }}
            >
              {translate("footer.cabinet.title", lang)}
            </Typography>
            <Box
              component="ul"
              sx={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              <Box component="li" sx={FooterWidgetLiStyle}>
                <Link href={`/${accessToken ? "profile" : "login"}`}>
                  {translate("footer.cabinet.title", lang)}
                </Link>
              </Box>

              <Box component="li" sx={FooterWidgetLiStyle}>
                <Link href="/shop">
                  {translate("footer.cabinet.shop", lang)}
                </Link>
              </Box>
            </Box>
          </Stack>
        </Stack>
        {/* <Stack sx={{ width: flex ? "30%" : "100%" }}>
          <Stack>
            <Typography
              sx={{ color: "#ffffff", fontWeight: 700, marginBottom: "30px" }}
            >
              {translate("footer.news.title", lang)}
            </Typography>
            <Box component="p" sx={{ color: "#b2b2b2", lineHeight: "26px" }}>
              {translate("footer.news.desc", lang)}
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                position: "relative",
                padding: "0",
                "& input": {
                  outline: "none",
                  color: "#b2b2b2",
                  background: "#303030",
                  width: "100%",
                  height: "46px",
                  fontSize: flex ? "14px" : "16px",
                  border: "none",
                  paddingLeft: flex ? "10px" : "20px",
                  "&::placeholder": {
                    color: "#b2b2b2",
                  },
                },
                "& button": {
                  display: "inline-block",
                  color: "#ffffff",
                  background: "#e7ab3c",
                  fontSize: "13px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  border: "1px solid #e7ab3c",
                  position: "absolute",
                  right: "0",
                  top: "0",
                  cursor: "pointer",
                  height: "100%",
                  padding: flex ? "0 6px" : "0 10px",
                },
              }}
            >
              <input
                type="email"
                placeholder={translate("footer.news.email", lang)}
                name="email"
              />
              <button type="submit">
                {translate("footer.news.join", lang)}
              </button>
            </Box>
          </Stack>
        </Stack> */}
      </Stack>
    </Stack>
  );
};
export default Footer;

import { Grid, Stack, SxProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ReactElement, useContext } from "react";
import NavItem from "./NavItem";
import { Colors, navItems } from "@/utils/consts";
import { DownIcon, HamburgerIcon } from "@/assets/icons";
import IndustryItem from "./IndustryItem";
import { AuthContext } from "@/context";
import { translate } from "@/utils/functions";
import { AllIndustriesResponseData } from "@/types/industry";
import { FlexBox } from "@/utils/globalStyles";

type Props = {
  padding: SxProps;
};

const HeaderBottom = ({ padding }: Props): ReactElement => {
  const { lang, industriesData } = useContext(AuthContext);

  return (
    <Grid
      container
      sx={{
        ...padding,
        background: Colors.green,
        height: { xs: "35px", sm: "40px", md: "45px", lg: "50px" },
        display: { xs: "none", md: "flex" },
      }}
    >
      <Grid item xs={1} md={3} lg={2.4} sx={{ height: "100%" }}>
        <Stack
          sx={{
            background: "inherit",
            color: "#ffffff",
            height: "100%",
            cursor: "pointer",
            position: "relative",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            flexDirection: "row",
            "&:hover": {
              "& ul": {
                top: { xs: "36px", sm: "41px", md: "45px", lg: "50px" },
                opacity: 1,
                visibility: "visible",
                zIndex: 99,
              },
            },
          }}
        >
          <HamburgerIcon />
          <Stack sx={{ ...FlexBox }}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                textTransform: "uppercase",
                marginLeft: "10px",
                display: { xs: "none", md: "flex" },
                userSelect: "none",
              }}
            >
              {translate("industry.title", lang)}
            </Typography>
            <Box
              component="i"
              sx={{
                marginLeft: { md: "10px", lg: "15px" },
                ...FlexBox,
              }}
            >
              <DownIcon />
            </Box>
          </Stack>
          {industriesData.data && (
            <Box
              component="ul"
              sx={{
                position: "absolute",
                width: "240px",
                left: "0",
                top: "70px",
                opacity: 0,
                visibility: "hidden",
                paddingBottom: "29px",
                background: "#fff",
                WebkitBoxShadow: "0 13px 32px rgba(51, 51, 51, 0.1)",
                boxShadow: "0 13px 32px rgba(51, 51, 51, 0.1)",
                WebkitTransition: "all 0.3s",
                OTransition: "all 0.3s",
                transition: "all 0.3s",
                listStyle: "none",
                margin: 0,
                padding: "15px 0",
                userSelect: "none",
              }}
            >
              {industriesData.data.map((e, ind) => (
                <IndustryItem
                  key={ind}
                  url={e.slug}
                  text={String(
                    e[`name_${lang}` as keyof AllIndustriesResponseData]
                  )}
                />
              ))}
            </Box>
          )}
        </Stack>
      </Grid>
      <Grid item xs={11} md={9} lg={9.6} sx={{ height: "100%" }}>
        <Box
          component="ol"
          sx={{
            width: "100%",
            height: "100%",
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            background: "inherit",
            "& li:last-child": {
              "& a": {
                borderRight: "none",
              },
            },
          }}
        >
          {navItems.map((e, ind) => (
            <NavItem key={ind} item={e} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default HeaderBottom;

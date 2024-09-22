import {
  EnFlagIcon,
  PhoneIcon,
  RuFlagIcon,
  UserIcon,
  UzFlagIcon,
} from "@/assets/icons";
import { EmailIcon, HeaderFacebookIcon } from "@/assets/icons/SocialIcons";
import CustomImage from "@/components/reusable/CustomImage";
import { theme } from "@/config/theme";
import { AuthContext } from "@/context";
import { Flags } from "@/types";
import { Colors } from "@/utils/consts";
import { decodeJWT } from "@/utils/functions";
import {
  Grid,
  Menu,
  MenuItem,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useContext, useState } from "react";

type Props = {
  padding: SxProps;
};

const HeaderTop = ({ padding }: Props): ReactElement => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { lang, setLang, accessToken } = useContext(AuthContext);
  const router = useRouter();
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option: string) => () => {
    setLang(option);
    Cookies.set("lang", option, { expires: 15 });
    setAnchorEl(null);
  };

  const handleClickProfile = () => {
    if (accessToken) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };

  const flags: Flags = {
    uz: <UzFlagIcon />,
    ru: <RuFlagIcon />,
    en: <EnFlagIcon />,
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        border: `1px solid ${Colors.headerBorder}`,
        ...padding,
      }}
    >
      <Grid
        item
        xs={2}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        <Link href="/">
          <CustomImage
            src="/images/logo.png"
            alt="logo"
            sx={{ width: "60px", height: "60px" }}
          />
        </Link>
      </Grid>

      <Grid
        item
        sm={6}
        md={7.5}
        lg={8.7}
        sx={{
          display: { xs: "none", sm: "flex" },
          justifyContent: { sm: "space-between" },
          "& a": {
            textDecoration: "none",
            color: theme.palette.text.primary,
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        <Stack
          sx={{
            display: { xs: "none", md: "flex" },
            marginRight: { md: "7px", lg: "25px" },
          }}
        >
          <Link href="mailto:ravshan.vafoev@advantex.uz">
            <EmailIcon />
            <Typography sx={{ marginLeft: "3px" }}>
              ravshan.vafoev@advantex.uz
            </Typography>
          </Link>
        </Stack>
        <Stack
          sx={{
            width: "100%",
            display: { xs: "none", sm: "flex" },
            borderLeft: { md: `1px solid ${Colors.headerBorder}` },
            borderRight: `1px solid ${Colors.headerBorder}`,
            justifyContent: "space-between",
            flexDirection: "row",
            padding: { sm: "0 5px", lg: "0 20px" },
            "& a": {
              textDecoration: "none",
              color: Colors.black,
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          <Link href="tel:+998901687628">
            <PhoneIcon />
            <Typography sx={{ marginLeft: "3px" }}>
              (+99890) 168-76-28
            </Typography>
          </Link>
          <HeaderFacebookIcon />
        </Stack>
      </Grid>

      <Grid
        item
        xs={10}
        sm={6}
        md={4.3}
        lg={3.2}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <Stack
          sx={{
            width: { xs: "60px", sm: "70px" },
            borderRight: { sm: `1px solid ${Colors.headerBorder}` },
          }}
        >
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              "& ul": {
                padding: 0,
                margin: 0,
              },
            }}
          >
            <MenuItem onClick={handleMenuItemClick("uz")}>
              <UzFlagIcon />
              <Typography variant="h5" sx={{ marginLeft: "3px" }}>
                uz
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuItemClick("ru")}>
              <RuFlagIcon />
              <Typography variant="h5" sx={{ marginLeft: "3px" }}>
                ru
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuItemClick("en")}>
              <EnFlagIcon />
              <Typography variant="h5" sx={{ marginLeft: "3px" }}>
                en
              </Typography>
            </MenuItem>
          </Menu>
          <Stack
            onClick={handleClick}
            sx={{
              cursor: "pointer",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "70px",
              margin: "0 auto 0 0",
            }}
          >
            {flags[lang]}
            <Typography variant="h5" sx={{ marginLeft: "3px" }}>
              {lang}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{
            maxWidth: { xs: "170px", sm: "200px" },
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            alignItems: "center",
            paddingLeft: "10px",
          }}
          onClick={handleClickProfile}
        >
          <UserIcon />
          <Typography
            variant="h5"
            sx={{
              maxWidth: "100%",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              fontWeight: 600,
            }}
          >
            {accessToken ? decodeJWT(accessToken)?.email ?? "user" : "Login"}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default HeaderTop;

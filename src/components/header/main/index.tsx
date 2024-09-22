import {
  CardIcon,
  DownIcon,
  HamburgerIcon,
  LikeIcon,
  SearchIcon,
} from "@/assets/icons";
import IconBadge from "@/components/reusable/IconBadge";
import { AuthContext } from "@/context";
import { Colors } from "@/utils/consts";
import { translate } from "@/utils/functions";
import {
  Box,
  Grid,
  InputBase,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { ReactElement, useContext, useRef, useState } from "react";
import DrawerWrapper from "../drawer/DrawerWrapper";
import MenuDrawer from "../drawer/MenuDrawer";
import CustomImage from "@/components/reusable/CustomImage";
import { useRouter } from "next/router";
import { FlexBox } from "@/utils/globalStyles";
import { AllIndustriesResponseData } from "@/types/industry";

type Props = {
  padding: SxProps;
};

const HeaderMain = ({ padding }: Props): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const { lang, accessToken, industriesData, favoriteProducts, cartProducts } =
    useContext(AuthContext);
  const [id, setId] = useState<number>(0);
  const inputRef = useRef<any>();
  const router = useRouter();
  const handleSearchClick = () => {
    const textQueryParam = inputRef.current.value;
    router.push({
      pathname: "/shop",
      query: { id, text: textQueryParam },
    });
    inputRef.current.value = null;
    setId(0);
  };

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleFavoriteCard = () => {
    if (accessToken) {
      router.push({ pathname: "profile", query: { tab: "favorite_products" } });
    } else {
      router.push("/login");
    }
  };

  const handleCheckOutCard = () => {
    if (accessToken) {
      router.push("/checkout");
    } else {
      router.push("/login");
    }
  };

  const activeIndustry = (num: number) => {
    const find =
      industriesData.data && industriesData.data.find((e) => e.id == num);
    if (find) {
      return find[`name_${lang}` as keyof AllIndustriesResponseData];
    }
    return industriesData?.data
      ? industriesData.data[0][
          `name_${lang}` as keyof AllIndustriesResponseData
        ]
      : "";
  };

  return (
    <Stack
      sx={{
        ...padding,
      }}
    >
      <Grid container sx={{ ...FlexBox }}>
        <Grid item xs={1} sx={{ display: { xs: "none", sm: "block" } }}>
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
          xs={12}
          sm={10}
          md={8}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: `1px solid ${Colors.headerBorder}`,
            height: "50px",
          }}
        >
          <Stack
            sx={{
              width: { xs: "150px", md: "200px", lg: "230px", xl: "250px" },
              height: "100%",
            }}
          >
            <Stack
              sx={{
                position: "relative",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                padding: "0 3px 0 5px",
                width: { xs: "150px", md: "200px", lg: "230px", xl: "250px" },
                height: "100%",
                "&:hover": {
                  "& div": {
                    opacity: 1,
                    visibility: "visible",
                    zIndex: 99,
                    top: "49px",
                  },
                },
              }}
            >
              <Typography
                sx={{
                  width: "90%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: { xs: "14px", lg: "16px" },
                  marginLeft: "7px",
                  userSelect: "none",
                }}
              >
                {String(activeIndustry(id))}
              </Typography>
              <DownIcon />
              <Stack
                sx={{
                  width: { xs: "150px", md: "200px", lg: "230px", xl: "250px" },
                  position: "absolute",
                  top: "70px",
                  left: 0,
                  opacity: 0,
                  visibility: "hidden",
                  border: `1px solid ${Colors.headerBorder}`,
                  borderRadius: "5px",
                  background: "#fff",
                  WebkitBoxShadow: "0 13px 32px rgba(51, 51, 51, 0.1)",
                  boxShadow: "0 13px 32px rgba(51, 51, 51, 0.1)",
                  WebkitTransition: "all 0.3s",
                  OTransition: "all 0.3s",
                  transition: "all 0.3s",
                  userSelect: "none",
                }}
              >
                {industriesData.data &&
                  industriesData.data.map((e, ind) => (
                    <Typography
                      key={ind}
                      sx={{ padding: "3px 5px" }}
                      onClick={() => setId(e.id)}
                    >
                      {String(
                        e[`name_${lang}` as keyof AllIndustriesResponseData]
                      )}
                    </Typography>
                  ))}
              </Stack>
            </Stack>
          </Stack>

          <InputBase
            placeholder={translate("header.main.searchplaceholder", lang)}
            fullWidth
            sx={{
              padding: "0 10px",
              borderLeft: `1px solid ${Colors.headerBorder}`,
              marginLeft: "5px",
            }}
            inputRef={inputRef}
          />

          <Stack
            onClick={handleSearchClick}
            sx={{
              width: "50px",
              cursor: "pointer",
            }}
          >
            <Stack
              sx={{
                width: "50px",
                height: "50px",
                background: Colors.orange,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SearchIcon />
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={1}
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", md: "right" },
            alignItems: "center",
            marginTop: { xs: "20px", md: 0 },
          }}
        >
          <Stack
            sx={{
              width: "55px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Stack onClick={handleFavoriteCard}>
              <IconBadge
                num={accessToken ? favoriteProducts?.data?.length ?? 0 : 0}
                icon={<LikeIcon />}
              />
            </Stack>
            <Stack onClick={handleCheckOutCard}>
              <IconBadge
                num={accessToken ? cartProducts?.data?.length ?? 0 : 0}
                icon={<CardIcon />}
              />
            </Stack>
          </Stack>
          <Stack
            sx={{
              background: Colors.orange,
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: "1px 5px",
              cursor: "pointer",
            }}
            onClick={handleDrawerToggle}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "uppercase",
                color: "white",
              }}
            >
              menu
            </Typography>
            <HamburgerIcon />
          </Stack>
        </Grid>
      </Grid>
      <DrawerWrapper
        open={open}
        setOpen={setOpen}
        toggleClose={handleDrawerToggle}
        isMenuBar
      >
        <MenuDrawer toggleClose={handleDrawerToggle} />
      </DrawerWrapper>
    </Stack>
  );
};

export default HeaderMain;

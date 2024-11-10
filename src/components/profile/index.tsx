import { Colors } from "@/utils/consts";
import { FlexBox, pageContainer } from "@/utils/globalStyles";
import { Stack, SxProps, Typography } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import CustomImage from "../reusable/CustomImage";
import Link from "next/link";
import ProfilSection from "./ProfilSection";
import { useRouter } from "next/router";
import OrdersSection from "./OrdersSection";
import FavoriteProducts from "../home/FavoriteProducts";
import { UserGetMeResponse } from "@/types/user";
import { getter, poster, translate } from "@/utils/functions";
import ProfileSkeleton from "../reusable/profileSkeleton";
import { AuthContext } from "@/context";
import Cookies from "js-cookie";

const ProfilComponent = (): ReactElement => {
  const { favoriteProducts, lang, token, setToken, setAccessToken } =
    useContext(AuthContext);
  const [userData, setUserData] = useState<UserGetMeResponse>();

  useEffect(() => {
    const getValues = async () => {
      const result = await getter("users/me", true);
      if (result.ok && result.data) {
        setUserData(result.data);
      }
    };
    getValues();
  }, []);

  const router = useRouter();
  const tabLikStyle = (active: boolean): SxProps => {
    const styles: SxProps = {
      "& a": {
        textDecoration: "none",
        color: "white",
        background: active ? "#8b5c05" : Colors.orange,
        borderRadius: "10px",
        padding: "3px 15px",
        fontWeight: 600,
        margin: "3px",
        "&:hover": {
          background: "#8b5c05",
        },
      },
    };
    return styles;
  };

  const handleLogOut = async () => {
    const result = await poster("auth/logout/", { refresh: token });
    if (result.ok && result.data) {
      Cookies.remove("refresh_token");
      Cookies.remove("access_token");
      setToken(null);
      setAccessToken(null);
      router.push("/");
    } else {
      alert(result.msg);
    }
  };
  return (
    <Stack sx={pageContainer}>
      <Stack>
        <Stack
          sx={{
            width: "100%",
            borderRadius: "10px",
            border: `1px solid ${Colors.headerBorder}`,
            padding: "10px 15px",
          }}
        >
          {userData ? (
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <CustomImage
                sx={{ width: "150px", height: "150px" }}
                src="/images/ava.webp"
                alt="avatar"
                imageStyle={{ borderRadius: "50%", cursor: "pointer" }}
              />
              <Stack>
                <Typography
                  variant="h3"
                  sx={{ textAlign: { xs: "center", sm: "start" } }}
                >
                  {userData?.first_name} {userData?.last_name}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: Colors.contrastText,
                    textAlign: { xs: "center", sm: "start" },
                  }}
                >
                  {userData.company ?? ""}
                </Typography>
                <Stack
                  sx={{
                    ...FlexBox,
                    flexWrap: "wrap",
                    marginTop: "10px",
                  }}
                >
                  <Typography sx={tabLikStyle(Boolean(!router.query.tab))}>
                    <Link href="/profile">Profile</Link>
                  </Typography>
                  <Typography
                    sx={tabLikStyle(Boolean(router.query.tab == "orders"))}
                  >
                    <Link href={`/profile?tab=orders`}>Orders</Link>
                  </Typography>
                  <Typography
                    sx={tabLikStyle(
                      Boolean(router.query.tab == "favorite_products")
                    )}
                  >
                    <Link href={`/profile?tab=favorite_products`}>
                      Favorite products
                    </Link>
                  </Typography>
                  <Typography
                    sx={{
                      textDecoration: "none",
                      color: "white",
                      background: Colors.orange,
                      borderRadius: "10px",
                      padding: "0 15px",
                      fontWeight: 600,
                      margin: "3px",
                      cursor: "pointer",
                      "&:hover": {
                        background: "#8b5c05",
                      },
                    }}
                    onClick={handleLogOut}
                  >
                    log out
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          ) : (
            <ProfileSkeleton />
          )}
        </Stack>
        {router.query?.tab === "orders" ? (
          <OrdersSection />
        ) : router.query?.tab === "favorite_products" ? (
          <Stack>
            <FavoriteProducts
              items={favoriteProducts?.data ?? []}
              clearPadding
              text={translate("profile.favorite", lang)}
            />
          </Stack>
        ) : (
          userData && <ProfilSection user={userData} setUser={setUserData} />
        )}
      </Stack>
    </Stack>
  );
};

export default ProfilComponent;

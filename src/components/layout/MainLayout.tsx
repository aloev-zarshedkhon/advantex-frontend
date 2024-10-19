import { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Footer from "../footer";
import { useRouter } from "next/router";
import { AuthContext } from "@/context";
import Loading from "../reusable/loading";
import { FlexBox } from "@/utils/globalStyles";
import Cookies from "js-cookie";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [load, setLoad] = useState<boolean>(true);
  const router = useRouter();
  const { setLang } = useContext(AuthContext);
  useEffect(() => {
    const queryLang = router.query?.lang;
    const validLang =
      queryLang && ["uz", "ru", "en"].some((e) => e == queryLang);

    if (queryLang && validLang) {
      Cookies.set("lang", String(queryLang), { expires: 15 });
      setLang(String(queryLang));
    }
  }, [setLang, router]);

  useEffect(() => {
    setLoad(false);
  }, []);

  return (
    <Stack>
      <Stack
        component={"main"}
        sx={{
          background: "white",
          boxSizing: "border-box",
        }}
      >
        {load && (
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 10,
              ...FlexBox,
              background: "black",
            }}
          >
            <Loading />
          </Stack>
        )}
        {children}
      </Stack>
      <Footer />
    </Stack>
  );
}

import { NotFoundIcon } from "@/assets/icons";
import { AuthContext } from "@/context";
import { Colors } from "@/utils/consts";
import { translate } from "@/utils/functions";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";
import { ReactElement, useContext } from "react";

const NotFound = (): ReactElement => {
  const { lang } = useContext(AuthContext);
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: {
          xs: "30px auto",
          sm: "50px auto",
          md: "70px auto",
          lg: "90px auto",
        },
        width: { xs: "80%", md: "60%", lg: "50%" },
      }}
    >
      <NotFoundIcon />
      <Typography
        variant="h3"
        sx={{
          color: "var(--black-900, #121212)",
          textAlign: "center",
          fontSize: "54px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "58px",
          letterSpacing: "-1px",
          margin: "10px 0",
        }}
      >
        {translate("404.title", lang)}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "var(--text-blue, #3E3E59)",
          textAlign: "center",
          fontSize: "18px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "30px",
          width: "70%",
        }}
      >
        {translate("404.desc", lang)}
      </Typography>
      <Typography
        sx={{
          margin: "20px 0",
          "& a": {
            textDecoration: "none",
            background: Colors.black,
            color: "white",
            padding: "10px 15px",
            borderRadius: "3px",
          },
        }}
      >
        <Link href="/"> {translate("404.btn", lang)}</Link>
      </Typography>
    </Stack>
  );
};

export default NotFound;

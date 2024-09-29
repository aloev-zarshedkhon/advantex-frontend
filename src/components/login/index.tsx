import React, { useContext } from "react";
import { Stack, Grid } from "@mui/material";
import TextBorderBottom from "../reusable/TextBorderBottom";
import { pageContainer } from "@/utils/globalStyles";

import { useRouter } from "next/router";
import LoginForm from "./LoginForm";
import ForgetForm from "./ForgetForm";
import ResetForm from "./ResetForm";
import { AuthContext } from "@/context";
import { translate } from "@/utils/functions";

const Login: React.FC = () => {
  const { lang } = useContext(AuthContext);
  const router = useRouter();

  return (
    <Stack sx={pageContainer}>
      <TextBorderBottom text={translate("login.title", lang)} />
      <Grid container>
        <Grid item xs={12} md={6} sx={{ margin: "20px auto" }}>
          {router.query?.tab === "forget_password" ? (
            <ForgetForm />
          ) : router.query?.tab === "reset_password" ? (
            <ResetForm />
          ) : (
            <LoginForm />
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Login;

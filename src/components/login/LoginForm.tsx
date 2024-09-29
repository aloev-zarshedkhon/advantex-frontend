import { FlexBox, inputStyle } from "@/utils/globalStyles";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { ReactElement, useContext } from "react";
import SubmitBtn from "../reusable/SubmitBtn";
import { Colors } from "@/utils/consts";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { poster, translate } from "@/utils/functions";
import { AuthContext } from "@/context";
import { useRouter } from "next/router";
import { LoginFormValues } from "@/types/user";
import Cookies from "js-cookie";

const LoginForm = (): ReactElement => {
  const { lang, accessToken, setAccessToken, setToken } =
    useContext(AuthContext);
  const router = useRouter();
  if (accessToken) {
    router.push("/");
  }
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const result = await poster("auth/login", data);
    if (result.ok && result.data) {
      Cookies.set("access_token", result.data.access, { expires: 1 / 24 });
      Cookies.set("refresh_token", result.data.refresh, { expires: 1 });
      setAccessToken(result.data.access);
      setToken(result.data.refresh);
      router.push("/");
      return;
    }
    alert(result.msg);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ margin: "20px auto" }}
    >
      <TextField
        label={translate("register.email", lang)}
        {...register("username", { required: true })}
        error={!!errors.username}
        helperText={
          errors.username ? translate("register.emailRequired", lang) : ""
        }
        sx={inputStyle}
      />

      <TextField
        label={translate("register.password", lang)}
        type="password"
        {...register("password", { required: true })}
        error={!!errors.password}
        helperText={
          errors.password ? translate("register.passwordRequired", lang) : ""
        }
        sx={inputStyle}
      />

      <Stack sx={{ ...FlexBox, justifyContent: "left" }}>
        <SubmitBtn text={translate("login.title", lang)} />
        <Typography
          sx={{
            marginLeft: "15px",
            "& a": {
              color: Colors.headerBorder,
            },
          }}
        >
          <Link href="/register">{translate("register.title", lang)}</Link>
        </Typography>
        <Typography
          sx={{
            marginLeft: "15px",
            "& a": {
              color: Colors.headerBorder,
            },
          }}
        >
          <Link href="/login?tab=forget_password">
            {translate("login.forget_pass", lang)}
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoginForm;

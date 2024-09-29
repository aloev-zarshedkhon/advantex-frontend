import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Box, Grid, Stack, SxProps, Typography } from "@mui/material";
import { FlexBox, pageContainer } from "@/utils/globalStyles";
import { AuthContext } from "@/context";
import { poster, translate } from "@/utils/functions";
import Link from "next/link";
import SubmitBtn from "../reusable/SubmitBtn";
import { Colors } from "@/utils/consts";
import TextBorderBottom from "../reusable/TextBorderBottom";
import { RegisterFormValues } from "@/types/user";
import { useRouter } from "next/router";

const RegisterPage: React.FC = () => {
  const { lang } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const router = useRouter();
  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const result = await poster("users/register", data);
    if (result.ok && result.data) {
      router.push("/login");
      return;
    }
    alert(result.msg);
  };

  const inputStyle: SxProps = {
    marginBottom: "20px",
    width: "100%",
  };

  return (
    <Stack sx={pageContainer}>
      <TextBorderBottom text="Register" />
      <Grid container>
        <Grid item xs={12} md={6} sx={{ margin: "20px auto" }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label={translate("register.name", lang)}
              {...register("first_name", { required: true })}
              error={!!errors.first_name}
              helperText={
                errors.first_name
                  ? translate("register.nameRequired", lang)
                  : ""
              }
              sx={inputStyle}
            />
            <TextField
              label={translate("register.lastName", lang)}
              {...register("last_name", { required: true })}
              error={!!errors.last_name}
              helperText={
                errors.last_name
                  ? translate("register.lastNameRequired", lang)
                  : ""
              }
              sx={inputStyle}
            />
            <TextField
              label={translate("register.phone", lang)}
              {...register("phone", {
                required: true,
                validate: (val: string) => /^\+998\d{9}$/.test(val),
              })}
              error={!!errors.phone}
              helperText={
                errors.phone ? translate("register.phoneRequired", lang) : ""
              }
              sx={inputStyle}
            />

            <TextField
              label={translate("register.email", lang)}
              {...register("email", { required: true })}
              error={!!errors.email}
              helperText={
                errors.email ? translate("register.emailRequired", lang) : ""
              }
              sx={inputStyle}
              type="email"
            />
            <TextField
              label={translate("register.password", lang)}
              type="password"
              {...register("password", { required: true })}
              error={!!errors.password}
              sx={inputStyle}
              helperText={
                errors.password
                  ? translate("register.passwordRequired", lang)
                  : ""
              }
            />

            <Stack sx={{ ...FlexBox, justifyContent: "left" }}>
              <SubmitBtn text={translate("register.title", lang)} />
              <Typography
                sx={{
                  marginLeft: "15px",
                  "& a": {
                    color: Colors.headerBorder,
                  },
                }}
              >
                <Link href="/login">login</Link>
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default RegisterPage;

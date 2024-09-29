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

type FormValues = {
  email: string;
};

const ForgetForm = (): ReactElement => {
  const { lang, accessToken } = useContext(AuthContext);
  const router = useRouter();
  if (accessToken) {
    router.push("/");
  }
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await poster("users/forgot-password", data);
    if (result.ok && result.data) {
      alert(
        translate("login.success_posted_forget_pass", lang, result.data.email)
      );
      router.push("/");
    } else {
      alert(result?.msg);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ margin: "20px auto" }}
    >
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

      <Stack sx={{ ...FlexBox, justifyContent: "left" }}>
        <SubmitBtn text={translate("btn.submit", lang)} />

        <Typography
          sx={{
            marginLeft: "15px",
            "& a": {
              color: Colors.headerBorder,
            },
          }}
        >
          <Link href="/login">{translate("login.title", lang)}</Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default ForgetForm;

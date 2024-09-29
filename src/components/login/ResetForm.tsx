import { FlexBox, inputStyle } from "@/utils/globalStyles";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { ReactElement, useContext } from "react";
import SubmitBtn from "../reusable/SubmitBtn";
import { Colors } from "@/utils/consts";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "@/context";
import { poster, translate } from "@/utils/functions";
import { useRouter } from "next/router";

type FormValues = {
  new_password: string;
};

const ResetForm = (): ReactElement => {
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
    const result = await poster("users/approve-forgot-password", {
      ...data,
      activation_code: router.query.key,
    });
    if (result.ok && result.data) {
      router.push("/login");
    } else {
      alert(result.msg);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ margin: "20px auto" }}
    >
      <TextField
        label={translate("register.password", lang)}
        {...register("new_password", { required: true })}
        error={!!errors.new_password}
        helperText={
          errors.new_password
            ? translate("register.passwordRequired", lang)
            : ""
        }
        sx={inputStyle}
      />

      <Stack sx={{ ...FlexBox, justifyContent: "left" }}>
        <SubmitBtn text={translate("login.reset", lang)} />
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

export default ResetForm;

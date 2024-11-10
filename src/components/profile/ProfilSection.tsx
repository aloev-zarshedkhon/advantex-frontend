import { EditIcon } from "@/assets/icons";
import { Colors } from "@/utils/consts";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import ProfilSectionItem from "./ProfilSectionItems";
import SubmitBtn from "../reusable/SubmitBtn";
import { UserGetMeResponse } from "@/types/user";
import { AuthContext } from "@/context";
import { putter, translate } from "@/utils/functions";
import { SubmitHandler, useForm } from "react-hook-form";
import { inputStyle } from "@/utils/globalStyles";

type Props = {
  user: UserGetMeResponse;
  setUser: Dispatch<SetStateAction<UserGetMeResponse | undefined>>;
};
type FormValues = {
  new_password: string;
  old_password: string;
};

const ProfilSection = ({ user, setUser }: Props): ReactElement => {
  const { lang } = useContext(AuthContext);
  const [edit, setEdit] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleUpdate = async () => {
    const first_name = nameRef.current?.value;
    const last_name = lastNameRef.current?.value;
    const phone = phoneRef.current?.value;
    const result = await putter(
      "users/me",
      { first_name, last_name, phone },
      true
    );
    if (result.ok && result.data) {
      setUser(result.data);
      setEdit(false);
    }
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await putter("users/reset-password", data, true);
    if (result.ok && result.data) {
      reset();
      alert(result.msg);
    } else {
      alert(result.msg);
    }
  };
  return (
    <Stack>
      <Stack
        sx={{
          border: `1px solid ${Colors.headerBorder}`,
          marginTop: "30px",
          borderRadius: "10px",
          padding: "10px 15px",
        }}
      >
        <IconButton
          sx={{ width: "40px", height: "40px", margin: "0 0 0 auto " }}
          onClick={() => setEdit(!edit)}
        >
          <EditIcon />
        </IconButton>
        <Stack>
          <ProfilSectionItem
            label={translate("order.first_name", lang)}
            value={user.first_name}
            edit={edit}
            refInput={nameRef}
            enableEdit
          />
          <ProfilSectionItem
            label={translate("order.last_name", lang)}
            value={user.last_name}
            edit={edit}
            refInput={lastNameRef}
            enableEdit
          />
          <ProfilSectionItem
            label={translate("order.phone", lang)}
            value={user.phone}
            edit={edit}
            refInput={phoneRef}
            enableEdit
          />
          <ProfilSectionItem
            label={translate("order.email", lang)}
            value={user.email}
            edit={edit}
          />
          <ProfilSectionItem
            label={translate("order.company", lang)}
            value={user.company ?? ""}
            edit={edit}
          />
        </Stack>

        {edit && (
          <Stack sx={{ margin: "20px 0 0 auto" }} onClick={handleUpdate}>
            <SubmitBtn text="Submit" />
          </Stack>
        )}
      </Stack>
      <Stack
        sx={{
          border: `1px solid ${Colors.headerBorder}`,
          margin: "30px 0",
          borderRadius: "10px",
          padding: "10px 15px",
        }}
      >
        <Typography variant="h3">
          {translate("profile.reset_password", lang)}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ marginTop: "20px" }}
        >
          <TextField
            label={translate("profile.old_password", lang)}
            {...register("old_password", { required: true })}
            error={!!errors.old_password}
            helperText={
              errors.old_password
                ? translate("profile.old_password_required", lang)
                : ""
            }
            sx={inputStyle}
          />
          <TextField
            label={translate("profile.new_password", lang)}
            {...register("new_password", { required: true })}
            error={!!errors.new_password}
            helperText={
              errors.new_password
                ? translate("profile.new_password_required", lang)
                : ""
            }
            sx={inputStyle}
          />

          <SubmitBtn text={translate("btn.submit", lang)} />
        </Box>
      </Stack>
    </Stack>
  );
};

export default ProfilSection;

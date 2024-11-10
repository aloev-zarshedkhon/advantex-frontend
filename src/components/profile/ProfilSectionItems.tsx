import { Colors } from "@/utils/consts";
import { FlexBox } from "@/utils/globalStyles";
import { Box, Stack, Typography } from "@mui/material";
import { ReactElement, RefObject } from "react";

type Props = {
  edit: boolean;
  label: string;
  value: string;
  refInput?: RefObject<HTMLInputElement>;
  enableEdit?: boolean;
};

const ProfilSectionItem = ({
  edit,
  label,
  value,
  refInput,
  enableEdit,
}: Props): ReactElement => {
  return (
    <Stack
      sx={{
        borderBottom: `1px solid ${Colors.headerBorder}`,
        ...FlexBox,
        justifyContent: "left",
        padding: "10px 0",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginRight: "30px",
          width: { xs: "30%", lg: "15%" },
        }}
      >
        {label}:
      </Typography>
      {edit && enableEdit ? (
        <Box
          component="input"
          placeholder={label}
          defaultValue={value}
          ref={refInput}
          sx={{
            outline: "none",
            padding: "5px 10px",
            border: "none",
            borderBottom: `1px solid ${Colors.contrastText}`,
          }}
        />
      ) : (
        <Typography variant="h4" sx={{ color: Colors.contrastText }}>
          {value}
        </Typography>
      )}
    </Stack>
  );
};

export default ProfilSectionItem;

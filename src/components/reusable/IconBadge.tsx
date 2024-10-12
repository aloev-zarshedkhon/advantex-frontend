import { Colors } from "@/utils/consts";
import { Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

type Props = {
  num: number;
  icon: JSX.Element;
};

const IconBadge = ({ num, icon }: Props): ReactElement => {
  return (
    <Stack
      sx={{
        position: "relative",
        height: "35px",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: "0",
          right: "-5px",
          zIndex: 2,
          height: "15px",
          width: "15px",
          background: Colors.orange,
          color: "#ffffff",
          borderRadius: "50%",
          fontSize: "11px",
          fontWeight: 700,
          textAlign: "center",
          lineHeight: "15px",
        }}
      >
        {num}
      </Typography>
      {icon}
    </Stack>
  );
};

export default IconBadge;

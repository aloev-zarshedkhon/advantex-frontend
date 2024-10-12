import { Colors } from "@/utils/consts";
import { Typography } from "@mui/material";
import { ReactElement } from "react";

type Props = {
  text: string;
};

const TextBorderBottom = ({ text }: Props): ReactElement => {
  return (
    <Typography
      variant="h1"
      sx={{
        textAlign: "center",
        position: "relative",
        color: "#252525",
        fontSize: { xs: "23px", sm: "30px", md: "35px" },
        lineHeight: { xs: "35px", sm: "44px", md: "60px" },
        fontWeight: 700,
        cursor: "pointer",
        "&::before": {
          position: "absolute",
          left: "0",
          right: "0",
          bottom: "0px",
          width: text.length * 10,
          height: "3px",
          background: Colors.orange,
          content: '""',
          margin: "0 auto",
          borderRadius: "5px",
        },
      }}
    >
      {text}
    </Typography>
  );
};

export default TextBorderBottom;

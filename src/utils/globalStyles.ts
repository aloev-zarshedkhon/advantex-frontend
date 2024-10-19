import { SxProps } from "@mui/material";
import { Colors } from "./consts";

export const pageContainer: SxProps = {
  padding: {
    xs: "7px",
    sm: "2px 30px",
    md: "3px 70px",
    lg: "40px 100px",
    xl: "50px 130px",
  },
  maxWidth: "1550px",
  width: "100%",
  margin: "0 auto",
};

export const FlexBox: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
};

export const ContrasButton: SxProps = {
  ...FlexBox,
  cursor: "pointer",
  "&:hover": { background: Colors.headerBorder },
  padding: "2px 3px",
  borderRadius: "5px",
};

export const inputStyle: SxProps = {
  marginBottom: "20px",
  width: "100%",
};

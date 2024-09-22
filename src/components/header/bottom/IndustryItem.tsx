import { Colors } from "@/utils/consts";
import { Box } from "@mui/material";
import Link from "next/link";
import { ReactElement } from "react";

type Props = {
  url: string;
  text: string;
};

const IndustryItem = ({ url, text }: Props): ReactElement => {
  return (
    <Box
      component="li"
      sx={{
        "& a": {
          display: "block",
          fontSize: "16px",
          color: "#000000",
          padding: "7px 30px",
          WebkitTransition: "all 0.3s",
          OTransition: "all 0.3s",
          transition: "all 0.3s",
          textDecoration: "none",
          "&:hover": {
            color: Colors.orangeHover,
          },
        },
      }}
    >
      <Link href={`/industry/${url}`}>{text}</Link>
    </Box>
  );
};

export default IndustryItem;

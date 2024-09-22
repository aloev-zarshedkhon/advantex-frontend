import { Stack, SxProps } from "@mui/material";
import { ReactElement } from "react";
import HeaderTop from "./top";
import HeaderMain from "./main";
import HeaderBottom from "./bottom";
import { pageContainer } from "@/utils/globalStyles";

const Header = (): ReactElement => {
  const Padding: SxProps = {
    padding: {
      xs: "7px",
      sm: "5px 30px",
      md: "7px 90px",
      lg: "10px 140px",
      xl: "15px 190px",
    },
  };
  return (
    <Stack sx={{ ...pageContainer, padding: 0 }}>
      <HeaderTop padding={Padding} />
      <HeaderMain padding={Padding} />
      <HeaderBottom
        padding={{
          padding: {
            xs: "0 7px",
            sm: "0px 30px",
            md: "0px 90px",
            lg: "0px 140px",
            xl: "0px 190px",
          },
        }}
      />
    </Stack>
  );
};

export default Header;

import { theme } from "@/config/theme";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import { Dispatch, ReactElement, SetStateAction } from "react";

type Props = {
  children?: React.ReactNode;
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  toggleClose: () => void;
  anchor?: "right" | "left" | "top" | "bottom";
  isMenuBar?: boolean;
  xsWidth?: string;
};

const DrawerWrapper = ({
  children,
  open,
  setOpen,
  toggleClose,
  anchor,
  isMenuBar,
  xsWidth,
}: Props): ReactElement => {
  const drawerWidth = { xs: xsWidth ?? "100%", sm: "75%", md: "50%" };
  const mdScreen = useMediaQuery(theme.breakpoints.up(900));

  return (
    <Box component="nav">
      <Drawer
        anchor={anchor ?? "right"}
        open={isMenuBar && mdScreen ? false : open}
        transitionDuration={600}
        onClose={toggleClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: "block",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: "white",
          },
        }}
      >
        {children}
      </Drawer>
    </Box>
  );
};

export default DrawerWrapper;

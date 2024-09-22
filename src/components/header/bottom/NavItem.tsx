import { AuthContext } from "@/context";
import { NavItemType } from "@/types";
import { Colors } from "@/utils/consts";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useContext } from "react";

type Props = {
  item: NavItemType;
  inDrawer?: boolean;
};

const NavItem = ({ item, inDrawer }: Props): ReactElement => {
  const { lang } = useContext(AuthContext);
  const router = useRouter();

  return (
    <Box
      component="li"
      sx={{
        background: inDrawer
          ? "none"
          : router.pathname.substring(1) == item.url
          ? Colors.orange
          : "inherit",
        height: inDrawer ? "none" : "100%",
        "&:hover": {
          background: inDrawer ? "none" : Colors.orange,
        },
        "& a": {
          fontSize: { xs: "18px", md: "13px" },
          fontWeight: { xs: 700, md: 600 },
          color: inDrawer ? Colors.red : "#ffffff",
          borderRight: inDrawer ? "none" : "2px solid #3b3b3b",
          letterSpacing: inDrawer ? "3px" : "none",
          textTransform: "uppercase",
          textDecoration: "none",
          WebkitTransition: "all 0.3s",
          OTransition: "all 0.3s",
          transition: "all 0.3s",
          padding: {
            xs: "8px 18px",
            md: "0 20px",
            lg: "0 40px",
          },
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Link href={`/${item.url}`}>
        {item[`text_${lang}` as keyof NavItemType]}
      </Link>
    </Box>
  );
};
export default NavItem;

import { CancelIcon } from "@/assets/icons";
import CustomImage from "@/components/reusable/CustomImage";
import { Colors, navItems } from "@/utils/consts";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { ReactElement, useContext } from "react";
import NavItem from "../bottom/NavItem";
import { AuthContext } from "@/context";
import { AllIndustriesResponseData } from "@/types/industry";

type Props = {
  toggleClose: () => void;
};

const MenuDrawer = ({ toggleClose }: Props): ReactElement => {
  const { lang, industriesData } = useContext(AuthContext);
  return (
    <Stack sx={{ padding: "20px 30px" }}>
      <Stack onClick={toggleClose}>
        <IconButton
          sx={{ width: "50px", height: "50px", margin: "0 0 0 auto" }}
        >
          <CancelIcon />
        </IconButton>
      </Stack>
      <Stack>
        <Stack>
          <Link href="/" onClick={toggleClose}>
            <CustomImage
              src="/images/logo.png"
              sx={{ width: "100px", height: "100px", margin: "10px auto" }}
              alt="logo"
            />
          </Link>
        </Stack>
        <Box
          component="ol"
          sx={{
            listStyle: "none",
            margin: "20px auto",
            padding: 0,
            width: "100%",
          }}
          onClick={toggleClose}
        >
          {navItems.map((e, ind) => (
            <NavItem key={ind} item={e} inDrawer />
          ))}
          <NavItem
            item={{
              text_uz: "Industriyalar",
              text_en: "Industries",
              text_ru: "Индустри",
              url: "industry",
            }}
            inDrawer
          />
          {industriesData.data &&
            industriesData.data.map((e, ind) => (
              <Typography
                onClick={toggleClose}
                key={ind}
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  textAlign: "center",
                  "& a": {
                    textDecoration: "none",
                    color: Colors.black,
                  },
                }}
              >
                <Link href={`/industry/${e.slug}`}>
                  {String(e[`name_${lang}` as keyof AllIndustriesResponseData])}
                </Link>
              </Typography>
            ))}
        </Box>
      </Stack>
    </Stack>
  );
};

export default MenuDrawer;

import { Stack, Typography } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import { FooterUrlIcon } from "../footer";
import {
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  VkIcon,
} from "@/assets/icons/SocialIcons";
import { AuthContext } from "@/context";
import { translate } from "@/utils/functions";

type Props = {
  text: string;
};

const ShareComponent = ({ text }: Props): ReactElement => {
  const [router, setRouter] = useState<string>();
  const { lang } = useContext(AuthContext);

  useEffect(() => {
    setRouter(window.location.href);
  }, []);
  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "right",
        margin: "5px 0",
      }}
    >
      <Typography sx={{ marginRight: "20px" }}>
        {translate("share.title", lang)} :
      </Typography>
      <Stack sx={FooterUrlIcon}>
        <FacebookIcon
          url={`https://www.facebook.com/sharer/sharer.php?u=${router}&quote=${text}`}
        />
      </Stack>
      <Stack sx={FooterUrlIcon}>
        <TwitterIcon
          url={`https://twitter.com/share?url=${router}&text=${text}`}
        />
      </Stack>
      <Stack sx={FooterUrlIcon}>
        <TelegramIcon
          url={`https://telegram.me/share/url?url=${router}&text=${text}`}
        />
      </Stack>
      <Stack sx={FooterUrlIcon}>
        <VkIcon url={`https://vk.com/share.php?url=${router}`} />
      </Stack>
    </Stack>
  );
};

export default ShareComponent;

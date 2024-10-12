import { FlexBox } from "@/utils/globalStyles";
import { Stack } from "@mui/material";
import { ReactElement } from "react";

type Props = {
  content: string;
};

const HtmlContent = ({ content }: Props): ReactElement => {
  return (
    <Stack
      sx={{
        margin: "20px 0",
        ...FlexBox,
        justifyContent: "left",
        width: "100%",
        "& img": {
          maxWidth: "100% !important",
        },
        "& video": {
          maxWidth: "100% !important",
        },
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Stack>
  );
};

export default HtmlContent;

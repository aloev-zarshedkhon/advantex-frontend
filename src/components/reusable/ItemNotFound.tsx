import { Stack } from "@mui/material";
import { ReactElement } from "react";
import CustomImage from "./CustomImage";

const ItemNotFound = (): ReactElement => {
  return (
    <Stack
      sx={{
        margin: "30px auto",
      }}
    >
      <CustomImage
        src="/images/notfound.png"
        sx={{ width: "100%", height: "100%" }}
      />
    </Stack>
  );
};

export default ItemNotFound;

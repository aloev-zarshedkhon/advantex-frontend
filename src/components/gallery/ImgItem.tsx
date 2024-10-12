import { ReactElement, useState } from "react";
import CustomImage from "../reusable/CustomImage";
import { Colors } from "@/utils/consts";
import { Stack } from "@mui/material";
import ModalWrapper from "../reusable/ModalWrapper";
type Props = {
  img: string;
  disableClick?: boolean;
};

const GalleryImgItem = ({ img, disableClick }: Props): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <Stack sx={{ cursor: "pointer" }}>
      <Stack onClick={() => setOpen(disableClick ? false : true)}>
        <CustomImage
          sx={{
            width: "100%",
            height: {
              xs: "200px",
              sm: "250px",
              md: "300px",
              lg: "350px",
              xl: "400px",
            },
            padding: "5px",
            border: `1px solid ${Colors.headerBorder}`,
            borderRadius: "5px",
          }}
          src={img}
          alt="Gallery img"
          imageStyle={{ width: "100%", height: "100%" }}
        />
      </Stack>
      <ModalWrapper
        open={open}
        setOpen={handleClose}
        content={
          <CustomImage
            sx={{
              width: "100%",
              height: "auto",
              padding: "5px",
              border: `1px solid ${Colors.headerBorder}`,
              borderRadius: "5px",
            }}
            src={img}
            alt="Gallery img"
            imageStyle={{ width: "100%", height: "100%" }}
          />
        }
      />
    </Stack>
  );
};

export default GalleryImgItem;

import { Stack, Typography } from "@mui/material";
import { ReactElement } from "react";
import CustomImage from "../../reusable/CustomImage";
import Link from "next/link";
import { Colors } from "@/utils/consts";
type Props = {
  img: string;
  title: string;
  url?: string;
  isBelt?: boolean;
  id?: number;
};
const BeltItem = ({ img, title, url, isBelt, id }: Props): ReactElement => {
  return (
    <Stack
      sx={{
        height: "350px",
        borderRadius: "10px",
        WebkitBoxShadow: "0 13px 32px rgba(51, 51, 51, 0.1)",
        boxShadow: "0 13px 32px rgba(51, 51, 51, 0.1)",
        transform: "scale(0.97)",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1)",
        },
        "& a": {
          width: "100%",
          height: "100%",
          textDecoration: "none",
        },
      }}
    >
      <Link
        href={`/${isBelt ? `shop?product_type=${id ?? 0}` : `industry/${url}`}`}
      >
        <CustomImage
          sx={{ width: "100%", height: "85%", padding: "10px" }}
          src={img}
          alt={title}
          imageStyle={{ borderRadius: "10px" }}
          disableSpin
        />
        <Stack>
          <Typography
            variant="h2"
            sx={{
              color: Colors.orange,
              fontWeight: 600,
              textTransform: "uppercase",
              textAlign: "center",
              fontSize: { xs: "16px", sm: "16px", md: "16px", lg: "16px" },
              lineHeight: "25px",
            }}
          >
            {title}
          </Typography>
        </Stack>
      </Link>
    </Stack>
  );
};

export default BeltItem;

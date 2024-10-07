import { Stack, Typography } from "@mui/material";
import { ReactElement } from "react";
import CustomImage from "../reusable/CustomImage";
import { Colors } from "@/utils/consts";
import Link from "next/link";
import { AllBlogResult } from "@/types";
import { dateFormatter } from "@/utils/functions";

const BlogItem = ({
  main_image,
  title,
  created_at,
  slug,
}: AllBlogResult): ReactElement => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "440px",
        "&:hover": {
          boxShadow: "0 13px 32px rgba(51, 51, 51, 0.3)",
        },
        transition: "all 0.4s ease-in-out",
        "& a": {
          width: "100%",
          height: "100%",
          textDecoration: "none",
        },
      }}
    >
      <Link href={`/blog/${slug}`}>
        <CustomImage
          sx={{ width: "100%", height: "70%" }}
          src={main_image?.image}
          alt={title}
          imageStyle={{ width: "100%", height: "100%" }}
        />
        <Stack
          sx={{
            padding: "10px",
            height: "30%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "18px", sm: "20px", md: "23px", lg: "26px" },
              lineHeight: { xs: "21px", sm: "24px", md: "27px", lg: "33px" },
              color: Colors.black,
            }}
          >
            {title.length > 50 ? title.substring(0, 50) + "..." : title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "11px", sm: "13px", md: "15px" },
              color: Colors.headerBorder,
            }}
          >
            {dateFormatter(created_at)}
          </Typography>
        </Stack>
      </Link>
    </Stack>
  );
};

export default BlogItem;

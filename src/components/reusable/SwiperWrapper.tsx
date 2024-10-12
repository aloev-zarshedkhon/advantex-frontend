import React, { CSSProperties } from "react";
import { Swiper } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Box, SxProps } from "@mui/material";
import { PaginationOptions } from "swiper/types";
import { Colors } from "@/utils/consts";

type Props = {
  navigation?: boolean;
  pagination?: boolean;
  slidesPerView?: number | "auto";
  children?: React.ReactNode;
};

const SwiperWrapper = ({
  navigation,
  pagination,
  slidesPerView,
  children,
}: Props) => {
  // type: "progressbar" | "bullets" | "fraction" | "custom"
  const paginationProps: PaginationOptions = {
    clickable: true,
    bulletElement: "span",
    dynamicBullets: true,
    type: "bullets",
  };
  const generateTransition = (num: number) => {
    try {
      const obj = {
        WebkitTransition: `all 0.${num}s ease 0.${num}s`,
        OTransition: `all 0.${num}s ease 0.${num}s`,
        transition: `all 0.${num}s ease 0.${num}s`,
        maxWidth: { xs: "80%", lg: num === 6 ? "40%" : "70%" },
      };
      return obj;
    } catch {
      return {};
    }
  };

  return (
    <Box
      sx={{
        "& div": {
          "& .swiper-button-next, .swiper-button-prev": {
            color: Colors.orange,
            opacity: 1,
            right: { xs: 6, sm: 20, md: 30, lg: 40 },
            "&::after": {
              fontSize: "25px",
            },
          },
          "& .swiper-button-prev": {
            left: { xs: 6, sm: 20, md: 30, lg: 40 },
            right: 0,
          },
          "& .swiper-pagination-bullet-active": {
            width: "30px",
            height: "8px",
            borderRadius: "10px",
            background: Colors.orange,
          },
        },
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={slidesPerView ?? 1}
        navigation={navigation}
        pagination={pagination ? paginationProps : false}
        spaceBetween={20}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          stopOnLastSlide: false,
        }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default SwiperWrapper;

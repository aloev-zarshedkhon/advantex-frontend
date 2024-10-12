import React, { ReactElement, ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Stack, SxProps } from "@mui/material";
import { Colors } from "@/utils/consts";

const PreviousBtn = (props: any) => {
  const { className, onClick } = props;

  return (
    <Stack
      className={className}
      onClick={onClick}
      sx={{
        width: "40px",
        height: "40px",
        "& svg": {
          width: "40px",
          height: "40px",
        },
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z"
          fill={Colors.orange}
          fillOpacity="1"
        />
      </svg>
    </Stack>
  );
};

const NextBtn = (props: any) => {
  const { className, onClick } = props;
  return (
    <Stack
      className={className}
      onClick={onClick}
      sx={{
        width: "40px",
        height: "40px",
        "& svg": {
          width: "40px",
          height: "40px",
        },
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"
          fill={Colors.orange}
          fillOpacity="1"
        />
      </svg>
    </Stack>
  );
};

type Props = {
  children?: ReactNode;
  onchange?: (e: any) => void;
  dots?: boolean;
  speed?: number;
  slidesToShow?: number;
  fade?: boolean;
  sx?: SxProps;
  variableWidth?: boolean;
};

const SliderWrapper = ({
  children,
  onchange,
  dots,
  speed,
  slidesToShow,
  fade,
  sx,
  variableWidth,
}: Props): ReactElement => {
  const settings = {
    dots: dots,
    infinite: true,
    speed: speed ?? 800,
    slidesToShow: slidesToShow ?? 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    afterChange: onchange,
    fade: fade ?? true,
    variableWidth: variableWidth,
  };
  return (
    <Stack
      sx={{
        "& .slick-arrow": {
          opacity: 1,
          color: Colors.orange,
          zIndex: 10,
          "&::before": {
            display: "none",
          },
          width: "40px",
          height: "40px",
        },
        "& .slick-prev": {
          left: { xs: 6, sm: 20, md: 30, lg: 40 },
        },
        "& .slick-next": {
          right: { xs: 6, sm: 20, md: 30, lg: 40 },
        },
        ...sx,
      }}
    >
      <Slider {...settings} prevArrow={<PreviousBtn />} nextArrow={<NextBtn />}>
        {children}
      </Slider>
    </Stack>
  );
};

export default SliderWrapper;

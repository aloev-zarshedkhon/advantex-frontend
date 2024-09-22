import { BannerType } from "@/types/banner";
import { Stack } from "@mui/material";
import { ReactElement, useContext, useState } from "react";
import SliderWrapper from "../reusable/SliderWrapper";
import HeroSliderItem from "./HeroSliderItem";
import { AuthContext } from "@/context";

type Props = {
  data: BannerType[];
};

const HeroSlider = ({ data }: Props): ReactElement => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const { lang } = useContext(AuthContext);
  return (
    <Stack
      sx={{
        overflowX: "clip",
        width: "100%",
        marginX: "auto",
        position: "relative",
      }}
    >
      <SliderWrapper onchange={(e) => setCurrentSlide(e)}>
        {data.map((item, ind) => (
          <HeroSliderItem
            key={ind}
            title={String(item[`title_${lang}` as keyof BannerType])}
            description={String(
              item[`description_${lang}` as keyof BannerType]
            )}
            label={String(item[`subtitle_${lang}` as keyof BannerType])}
            btnText={String(item[`button_text_${lang}` as keyof BannerType])}
            btnUrl={item.url}
            bgImg={item.image?.image ?? ""}
            active={ind === currentSlide}
          />
        ))}
      </SliderWrapper>
    </Stack>
  );
};

export default HeroSlider;

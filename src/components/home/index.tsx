import { Stack } from "@mui/material";
import { ReactElement, Suspense, useEffect, useState } from "react";
import BeltsSection from "./belt";
import FavoriteProducts from "./FavoriteProducts";
import IndustriesSection from "./Industries";
import BlogSection from "./BlogSection";

import { pageContainer } from "@/utils/globalStyles";
import { BannerType } from "@/types/banner";
import { getter } from "@/utils/functions";
import { Product } from "@/types/product";
import HeroSlider from "./HeroSlider";

const HomeComponent = (): ReactElement => {
  const [data, setData] = useState<BannerType[]>();
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const getValues = async () => {
      const result = await getter("gallery/banners");
      if (result.ok && result?.data) {
        const sliders = result.data;
        setData(sliders.length > 1 ? sliders : [...sliders, ...sliders]);
      }

      const getProduct = await getter("shop/product?featured=true");
      if (getProduct.ok && getProduct?.data) {
        setProducts(getProduct.data.results);
      }
    };
    getValues();
  }, []);

  return (
    <Stack>
      <Suspense fallback={<div>loading</div>}>
        <Stack sx={{ ...pageContainer, padding: "0" }}>
          {data && data.length > 0 && <HeroSlider data={data} />}
        </Stack>
        <BeltsSection />
        {products && (
          <FavoriteProducts items={[...products, ...products, ...products]} />
        )}
        <IndustriesSection />
        <BlogSection />
      </Suspense>
    </Stack>
  );
};

export default HomeComponent;

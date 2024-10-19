import { MainImage } from "./blogItem";
import { Product, ProductType } from "./product";

export type AllIndustriesResponseData = {
  name_uz: string;
  name_ru: string;
  name_en: string;
  slug: string;
  image: MainImage;
  id: number;
};

export type IndustriesChild = {
  name_ru: string;
  name_uz: string;
  name_en: string;
  slug: string;
  image: MainImage;
  id: number;
};

// If you have the entire JSON data as a single object:
export type IndustryDetailResponseData = {
  name_ru: string;
  name_uz: string;
  name_en: string;
  slug: string;
  image: MainImage;
  description_ru: string;
  description_uz: string;
  description_en: string;
  children: IndustriesChild[];
  products: Product[];
};

import { MainImage } from "./blogItem";

export type ProductType = {
  name_ru: string | null;
  name_uz: string | null;
  name_en: string | null;
  id: number;
};

export type Product = {
  name: string;
  id: number;
  main_image: MainImage | null;
  type: ProductType;
  price: number;
  status: string;
};

export type AllProductsResponseData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
};

interface Industry {
  name_en: string | null;
  name_ru: string | null;
  name_uz: string | null;
  slug: string;
}

interface Brand {
  name: string;
  id: number;
}

export type productDetailTypes = {
  name_en: string | null;
  name_ru: string | null;
  name_uz: string | null;
  id: number;
};

export type ProductDetailType = {
  id: number;
  name: string;
  code: string;
  main_image: MainImage;
  images: MainImage[];
  price: number;
  type: productDetailTypes;
  industries: Industry[];
  brand: Brand;
  description_en: string | null;
  description_ru: string | null;
  description_uz: string | null;
  origin_en: string | null;
  origin_ru: string | null;
  origin_uz: string | null;
  width: number;
  height: number;
  length: number;
};

export type CartProduct = {
  product: {
    name: "Optibelt SUPER XE-POWER PRO XPZ 2840";
    id: 1;
    main_image: MainImage;
    type: productDetailTypes;
    price: number;
    status: string;
  };
  quantity: number;
  id: number;
  price: number;
};

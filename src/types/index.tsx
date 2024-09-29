import {
  LoginFormValues,
  RegisterFormValues,
  userCreatedResponse,
  userLoginResponse,
} from "./user";

type postAllData = userCreatedResponse | userLoginResponse | any;
export type FetchPostReturnType = {
  ok: boolean;
  data: postAllData | null;
  msg: string;
};

export type FetchBody = RegisterFormValues | LoginFormValues | any;

import { BlogResponseData } from "@/types/blogItem";
import { AllGalleryResponseData, GalleryResponseData } from "@/types/gallery";
import {
  AllIndustriesResponseData,
  IndustryDetailResponseData,
} from "@/types/industry";
import { AllProductsResponseData, ProductDetailType } from "@/types/product";
import { ReactElement } from "react";

export type Flags = {
  [key: string]: JSX.Element;
};
export type TableCellType = string | { icon: ReactElement };
export type TableBodyCellType = {
  [key: string]: JSX.Element | string | number;
};

export type NavItemType = {
  url: string;
  text_en: string;
  text_uz: string;
  text_ru: string;
};

// blog model typelari
interface AllBlogMainImage {
  title: string;
  description: string;
  image: string;
  uploaded_at: string;
}
interface AllBlogCategory {
  name: string;
  id: number;
}
export type AllBlogResult = {
  title: string;
  main_image: AllBlogMainImage;
  slug: string;
  categories: AllBlogCategory[];
  created_at: string;
};
export type AllBlogResponseData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: AllBlogResult[];
};

//fetch funksiyasi uchun barcha typelarni jamlash
type getAllData =
  | AllBlogResponseData
  | BlogResponseData
  | AllGalleryResponseData
  | GalleryResponseData
  | AllIndustriesResponseData[]
  | IndustryDetailResponseData
  | AllProductsResponseData
  | ProductDetailType
  | any;
export type FetchReturnType = {
  ok: boolean;
  data: getAllData | null;
  msg: string;
};

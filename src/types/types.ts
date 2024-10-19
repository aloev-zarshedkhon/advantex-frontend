import { MainImage } from "./blogItem";

export type AllTypesResponseData = {
  name_uz: string;
  name_ru: string;
  name_en: string;
  image: MainImage;
  id: number;
};

export type CompanyOptions = {
  id: number;
  key: string;
  value: string;
};

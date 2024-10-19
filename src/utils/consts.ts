import { NavItemType } from "@/types";

export const Variables = {
  defaultLang: "ru",
  mapKey: process.env.NEXT_PUBLIC_MAP_KEY,
  captchaKey: process.env.NEXT_PUBLIC_CAPTCHA_KEY,
  max_count: process.env.NEXT_PUBLIC_MAX_COUNT,
};

export const Colors = {
  black: "#252525",
  orange: "#e7ab3c",
  headerBorder: "#ccc",
  green: "#28a745",
  orangeHover: "#e7ab3c",
  footerBg: "#191919",
  red: "#3D1212",
  contrastText: "#DCD4D4",
};

export const navItems: NavItemType[] = [
  {
    url: "about",
    text_en: "about us",
    text_uz: "biz haqimizda",
    text_ru: "о нас",
  },
  { url: "shop", text_en: "shop", text_uz: "do'kon", text_ru: "магазин" },
  { url: "blog", text_en: "blog", text_uz: "blog", text_ru: "блог" },
  {
    url: "contact",
    text_en: "contact",
    text_uz: "aloqa",
    text_ru: "контакты",
  },
  {
    url: "gallery",
    text_en: "gallery",
    text_uz: "galereya",
    text_ru: "галерея",
  },
];

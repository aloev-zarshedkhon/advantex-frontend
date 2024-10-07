// Interfeys main_image uchun
export type MainImage = {
  title: string;
  description: string;
  image: string;
  uploaded_at: string;
};

// Interfeys category uchun
interface Category {
  name: string;
  id: number;
}

// Interfeys response uchun
export interface BlogResponseData {
  title: string;
  body: string;
  main_image: MainImage;
  images: MainImage[];
  slug: string;
  categories: Category[];
  created_at: string;
}

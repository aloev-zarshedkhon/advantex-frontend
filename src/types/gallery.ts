export type GalleryResultItem = {
  title_uz: string;
  title_en: string;
  title_ru: string;
  id: number;
  image: string;
};

export type AllGalleryResponseData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: GalleryResultItem[];
};

interface ImageItem {
  title: string;
  description: string;
  image: string;
  uploaded_at: string;
}

export type GalleryResponseData = {
  title_uz: string;
  title_en: string;
  title_ru: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
  description: string;
  images: ImageItem[];
};

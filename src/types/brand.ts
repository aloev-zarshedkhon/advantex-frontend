export type BrandsResultItem = {
  name: string;
  id: number;
};

export type BrandsResponseData = {
  count: number;
  next: null;
  previous: null;
  results: BrandsResultItem[];
};

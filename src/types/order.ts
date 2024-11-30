import { MainImage } from "./blogItem";
import { productDetailTypes } from "./product";

interface Product {
  name: string;
  id: number;
  main_image: MainImage;
  type: productDetailTypes;
  price: number;
  status: string;
}

export type OrderItems = {
  product: Product;
  quantity: number;
  id: number;
  price: number;
};

export type OrderItem = {
  items: OrderItems[];
  id: number;
  total_price: number | null;
  status: string;
  comment: string;
  created_at: string;
};

export type OrdersResponseData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: OrderItem[];
};

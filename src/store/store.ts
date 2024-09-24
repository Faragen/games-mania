import { getProducts } from "./fetchRequests/getProducts";

export const url = "http://localhost:3000";

export type Product = {
  id: number;
  productName: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export const productsList: Product[] = [];

if (!productsList[0]) {
  const initialProducts = await getProducts(url, 20, 0);
  console.log(initialProducts);

  initialProducts.forEach((product) => productsList.push(product));
}

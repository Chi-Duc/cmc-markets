import { fetchProducts } from './mock-apis';

export type TProduct = {
  id: number;
  name: string;
  description: string;
  priceInAUD: number;
  image?: string;
}

export type TProductPage = {
  products: TProduct[];
  hasMore: boolean;
}

export type TProductWithQuantity = {
  product: TProduct;
  quantity: number;
}

export async function getProducts(
  pageIndex: number = 0,
  pageSize: number = 20
): Promise<TProductPage> {
  return (await fetchProducts(pageIndex, pageSize)) as TProductPage;
}
import { fetchShippingCost } from './mock-apis';
import { TProductWithQuantity } from './product';

export async function calculateShippingCost(totalPrice: number) : Promise<number> {
  return await fetchShippingCost(totalPrice);
}

export function placeOrder(
  items: TProductWithQuantity[]
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 100);
  });

}

import { loremIpsum } from 'lorem-ipsum';
let products: any[] = [];

const productImages = [];

const generateProducts = (numberOfProducts: number = 20) : any[] => {
  const generatedProducts = [];
  for (let i = 0; i < numberOfProducts; i++) {
    generatedProducts.push({
      id: i,
      name: loremIpsum({
        sentenceLowerBound: 2,
        sentenceUpperBound: 5,
        units: 'sentences',
      }),
      description: loremIpsum({
        sentenceUpperBound: 6,
        paragraphLowerBound: 2,
        paragraphUpperBound: 2,
        units: 'paragraphs',
      }),
      priceInAUD: (Math.random() * 100).toFixed(2),
      image: `https://source.unsplash.com/random?sig=${Math.round(Math.random()*100)}`,
    });
  }
  return generatedProducts;
}

const getProducts = () => {
  if (products.length === 0) {
    products = generateProducts();
  }
  
  return products;
}

const data = {
  products: getProducts(),
  countries: [
    {
      name: 'Australia',
      conversionRateFromAUD: 1,
    },
    {
      name: 'US',
      conversionRateFromAUD: 1.5,
    },
    {
      name: 'UK',
      conversionRateFromAUD: 2,
    },
  ],
};

export const fetchCountries = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.countries);
    }, 100);
  });
  
export const fetchProducts = (pageIndex: number, pageSize: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.products);
    }, 100);
  });

export const fetchShippingCost = (totalPrice: number) : Promise<number> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(totalPrice < 50 ? 10 : 20);
    }, 100);
  });
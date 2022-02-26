import { fetchCountries } from './mock-apis';

export type TCountry = {
  name: string;
  conversionRateFromAUD: number;
  currencySymbol: string;
}

export async function getCountries() {
  return (await fetchCountries()) as TCountry[];
}
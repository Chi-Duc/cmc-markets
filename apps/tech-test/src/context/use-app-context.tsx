import { createContext, useContext, useState, useEffect } from 'react';
import { TCountry, getCountries } from '../services/country';
import { TProduct, TProductWithQuantity } from '../services/product';

export const AppContext = createContext({} as IAppContext);

export interface IAppContext {
  countries: TCountry[];
  selectedCountry: TCountry;
  setSelectedCountry: (country: TCountry) => void;
  shoppingCart: TProductWithQuantity[];
  addProductToShoppingCart: (product: TProduct) => void;
  removeProductFromShoppingCart: (product: TProduct) => void;
  clearShoppingCart: () => void;
  updateProductQuantity: (productToUpdate: TProduct, changedQuantity: number) => void;
  busy: boolean;
  setBusy: (doing: boolean) => void;
}

export function AppContextWrapper({ children }) {
  const [ctxCountries, setCtxCountries] = useState<TCountry[]>([]);
  const [ctxSelectedCountry, setCtxSelectedCountry] = useState<TCountry>();
  const [ctxShoppingCart, setCtxShoppingCart] = useState<TProductWithQuantity[]>([]);
  const [ctxBusy, setCtxBusy] = useState<boolean>(false);

  const setSelectedCountry = (country: TCountry) => {
    setCtxSelectedCountry(country);
  };

  const addProductToShoppingCart = (productToAdd: TProduct) => {
    const cart = [...ctxShoppingCart];
    const productInCart = cart.find(
      (product) => productToAdd.id === product.product.id
    );
    
    if (!productInCart) {
      cart.push({
        product: productToAdd,
        quantity: 1
      });
    } else {
      productInCart.quantity++;
    }

    setCtxShoppingCart(cart);
  };

  const removeProductFromShoppingCart = (
    productToRemove: TProduct
  ) => {
    setCtxShoppingCart(ctxShoppingCart.filter(
      (item) => item.product.id !== productToRemove.id
    ));  
  };

  const clearShoppingCart = () => {
    setCtxShoppingCart([]);
  }

  const updateProductQuantity = (productToUpdate: TProduct, changedQuantity: number) => {
    const cart = [...ctxShoppingCart];
    const productInCart = cart.find(
      (product) => productToUpdate.id === product.product.id
    );
    
    if (productInCart) {
      productInCart.quantity += changedQuantity;
      if (productInCart.quantity === 0) {
        removeProductFromShoppingCart(productToUpdate);
      } else {
        setCtxShoppingCart(cart);
      }      
    }
  }

  const setBusy = (doing: boolean) => {
    setCtxBusy(doing);
  };

  useEffect(() => {
    try {
      setCtxBusy(true);
      const fetchCountries = async () => {
        const countries = await getCountries();
        setCtxCountries(countries);

        if (countries.length > 0) {
          setCtxSelectedCountry(countries[0]);
        }
      };

      fetchCountries();      
    } catch (error) {
      console.log('Error fetching countries: ', error);
    } finally {
      setCtxBusy(false);
    }
  }, []);


  let appState: IAppContext = {
    countries: ctxCountries,
    selectedCountry: ctxSelectedCountry,
    setSelectedCountry,
    shoppingCart: ctxShoppingCart,
    addProductToShoppingCart,
    removeProductFromShoppingCart,
    clearShoppingCart,
    updateProductQuantity,
    busy: ctxBusy,
    setBusy,
  };

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext<IAppContext>(AppContext);
}

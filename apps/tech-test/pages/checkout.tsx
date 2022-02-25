import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Grid, Button, Typography } from '@mui/material';
import CheckOutProductCard from '../src/components/checkout-product-card';
import CheckOutCard from '../src/components/checkout-card';
import { useAppContext } from '../src/context/use-app-context';

const StyledPage = styled.div`
  margin: auto;
  width: 80%;
`;

const ProductCardContainer = styled.div`
  margin-bottom: 10px;
`;

export default function CheckoutPage(props) {
  const appContext = useAppContext();
  const router = useRouter();
  const { shoppingCart } = appContext;

  useEffect(() => {
    if (shoppingCart.length === 0) {
      router.push('/');
    }
  }, [shoppingCart]);

  const renderShoppingCart = () => {
    return shoppingCart.map((productInCart) => (
      <ProductCardContainer key={productInCart.product.id}>
        <CheckOutProductCard productWithQuantity={productInCart} />
      </ProductCardContainer>
    ));
  }

  return (
    <StyledPage>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {renderShoppingCart()}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CheckOutCard />
        </Grid>
      </Grid>
    </StyledPage>
  );
} 
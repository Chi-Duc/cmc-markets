import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  CardActions,
  Stack,
  Button
} from '@mui/material';
import { useAppContext } from '../context/use-app-context';
import { calculateShippingCost, placeOrder } from '../services/checkout';

const CardContentRow = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  &.last-row {
    padding-top: 10px;
    border-top: 1px solid white;
  }
`;

export default function CheckOutCard() {
  const router = useRouter();
  const appContext = useAppContext();
  const { selectedCountry, shoppingCart } = appContext;
  const [shippingCost, setShippingCost] = useState<number>(0);

  const totalCart = shoppingCart.reduce((prev, curr) => 
    prev + curr.product.priceInAUD * curr.quantity * selectedCountry.conversionRateFromAUD, 
    0
  );

  const handlePlaceOrder = async () => {
    const result = await placeOrder(shoppingCart);
    if (result) {
      router.push('/thankyou');
    }
  };

  const handleContinueShopping = () => {
    router.push('/');
  }

  useEffect(() => {
    const getShippingCost = async () => {
      const cost = await calculateShippingCost(totalCart);

      setShippingCost(cost);
    };

    getShippingCost();
  }, [selectedCountry, shoppingCart]);

  return (
    <Card>
      <CardHeader title="Order Summary" />
      <CardContent>
        <CardContentRow>
          <Typography variant="body1" color="text.primary">
            Cart total:
          </Typography>
          <Typography variant="body1" color="text.primary">
            ${totalCart.toFixed(2)}
          </Typography>
        </CardContentRow>
        <CardContentRow>
          <Typography variant="body1" color="text.primary">
            Shipping cost:
          </Typography>
          <Typography variant="body1" color="text.primary">
            ${shippingCost}
          </Typography>
        </CardContentRow>
        <CardContentRow className="last-row">
          <Typography variant="h6" color="text.primary">
            Total:
          </Typography>
          <Typography variant="h6" color="text.primary">
            ${(totalCart + shippingCost).toFixed(2)}
          </Typography>
        </CardContentRow>
      </CardContent>
      <CardActions
        sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}
      >
        <Stack spacing={2} direction="column">
          <Button variant="contained" onClick={handlePlaceOrder}>
            Place Order
          </Button>
          <Button variant="outlined" onClick={handleContinueShopping}>
            Continue shopping
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  IconButton
} from '@mui/material';
import { Favorite, ShoppingCart } from '@mui/icons-material'
import { TProduct } from '../services/product';
import { useAppContext } from '../context/use-app-context';
import ConfirmationDialog from './confirmation-dialog';

const CardContentBody = styled.div`
  height: 100px;
`;

type TProductCardProps = {
  product: TProduct;
}
export default function ProductCard(props: TProductCardProps): JSX.Element {
  const { product } = props;
  const appContext = useAppContext();
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);

  const { selectedCountry, addProductToShoppingCart } = appContext;
  const price = selectedCountry
    ? (product.priceInAUD * selectedCountry.conversionRateFromAUD).toFixed(2)
    : product.priceInAUD;

  const handleAddToCartClick = () => {
    setConfirmationOpen(true);
  }

  const handleCloseConfirmationDialog = () => {
    setConfirmationOpen(false);
  };

  const handleAddToCartConfirmation = () => {    
    addProductToShoppingCart(product);
    setConfirmationOpen(false);
  }

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height="300"
          src={product.image}
          alt={product.name}
        />
        <CardContent>
          <CardContentBody>
            <Typography variant="h6" color="text.primary">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContentBody>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ marginTop: 1 }}
          >
            ${price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Favorite />
          </IconButton>
          <IconButton aria-label="add to bag" onClick={handleAddToCartClick}>
            <ShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
      <ConfirmationDialog
        open={confirmationOpen}
        text="Do you want to add this product to your shopping cart?"
        onClose={handleCloseConfirmationDialog}
        onOk={handleAddToCartConfirmation}
      />
    </>
  );
}
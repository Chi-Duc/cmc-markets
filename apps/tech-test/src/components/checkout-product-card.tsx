import React, { useState } from 'react';
import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  IconButton,
  Box,
  Button
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material'
import { TProductWithQuantity } from '../services/product';
import { useAppContext } from '../context/use-app-context';
import ConfirmationDialog from './confirmation-dialog';

type TProductCardProps = {
  productWithQuantity: TProductWithQuantity;
}
export default function CheckoutProductCard(props: TProductCardProps): JSX.Element {
  const { productWithQuantity } = props;
  const { product, quantity } = productWithQuantity;
  const appContext = useAppContext();
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);

  const {
    selectedCountry,
    removeProductFromShoppingCart,
    updateProductQuantity,
  } = appContext;

  const price = product.priceInAUD * selectedCountry.conversionRateFromAUD;

  const handleRemoveItemClick = () => {
    setConfirmationOpen(true);
  }

  const handleCloseConfirmationDialog = () => {
    setConfirmationOpen(false);
  };

  const handleRemoveFromCartConfirmation = () => {
    removeProductFromShoppingCart(product);
    setConfirmationOpen(false);
  };

  const handleIncreaseQuantity = () => {
    updateProductQuantity(product, 1);
  };

  const handleDecreaseQuantity = () => {
    updateProductQuantity(product, -1);
  }

  return (
    <>
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          src={product.image}
          alt="product image"
        />
        <Box flexGrow={1} sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 auto' }}>
            <Typography component="div" variant="h6">
              {product.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {product.description}
            </Typography>
            <Typography component="div" variant="body1" sx={{ marginTop: '10px'   }}>
              {`${selectedCountry.currencySymbol}${price.toFixed(2)}`}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '0 10px 10px 0',
            }}
          >
            <div>
              <IconButton
                aria-label="decrease"
                onClick={handleDecreaseQuantity}
              >
                <Remove />
              </IconButton>
              <Button variant="outlined" disabled>
                <Typography component="div" variant="h6">
                  {quantity}
                </Typography>
              </Button>
              <IconButton
                aria-label="increase"
                onClick={handleIncreaseQuantity}
              >
                <Add />
              </IconButton>
            </div>
            <Button variant="outlined" onClick={handleRemoveItemClick}>
              Remove
            </Button>
          </Box>
        </Box>
      </Card>
      <ConfirmationDialog
        open={confirmationOpen}
        text="Do you want to remove this item from your shopping cart?"
        onClose={handleCloseConfirmationDialog}
        onOk={handleRemoveFromCartConfirmation}
      />
    </>
  );
}
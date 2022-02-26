import React from 'react';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
} from '@mui/material';
import { AccountCircle, ShoppingCart, Search } from '@mui/icons-material';
import CountrySelector from './country-selector';
import { useAppContext } from '../context/use-app-context';

type THeaderProps = {
  showMessage(message: string, autoHideDuration: number, type: string): void;
}
export default function Header(props: THeaderProps): JSX.Element {
  const router = useRouter();
  const { showMessage } = props;
  const appContext = useAppContext();
  const { shoppingCart } = appContext;

  const handleOpenSearch = () => {
    showMessage('Feature not implemented yet!', 3, 'info');
  }

  const handleAccessAccount = () => {
    showMessage('Feature not implemented yet!', 3, 'info')
  };

  const numberOfItemInCart = shoppingCart.reduce((prev, curr) => prev + curr.quantity, 0);

  const handleOpenShoppingCard = () => {
    if (numberOfItemInCart === 0) {
      showMessage('The shopping cart is empty!', 3, 'info');
    } else {
      router.push('/checkout');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="span" color="#017ACC">
            <b>CMC Markets</b>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="search product"
              aria-controls={'search a product'}
              aria-haspopup="true"
              onClick={handleOpenSearch}
              color="inherit"
            >
              <Search />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={'user account'}
              aria-haspopup="true"
              onClick={handleAccessAccount}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="shopping card"
              aria-controls={'shopping card'}
              aria-haspopup="true"
              onClick={handleOpenShoppingCard}
              color="inherit"
            >
              <Badge
                badgeContent={numberOfItemInCart}
                color="secondary"
                invisible={numberOfItemInCart === 0}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Typography
        variant="body1"
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <CountrySelector />
      </Typography>
    </Box>
  );
}
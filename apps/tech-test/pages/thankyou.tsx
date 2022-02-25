import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button } from '@mui/material';
import { useAppContext } from '../src/context/use-app-context';

export default function ThankyouPage() {
  const router = useRouter();
  const appContext = useAppContext();

  useEffect(() => {
    appContext.clearShoppingCart();
  }, []);

  const handleContinueShopping = () => {
    router.push('/');
  };

  return (
    <Box flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography component="div" variant="h4" sx={{ marginBottom: '30px' }}>
        Thank you for shopping with us!
      </Typography>
      <Button variant="contained" onClick={handleContinueShopping}>
        Continue shopping
      </Button>
    </Box>
  );
}

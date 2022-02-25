import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { Grid, Pagination } from '@mui/material';
import { TProduct, getProducts } from '../src/services/product';
import ProductCard from '../src/components/product-card';

const StyledPage = styled.div`
  margin-bottom: 20px;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export function Index() {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    const retrieveProducts = async() => {
      const products = await getProducts();      

      setProducts(products);
    }
    
    retrieveProducts();
  }, []);

  const renderProductCard = (product: TProduct) => {
    return (      
      <Grid item xs={12} sm={6} lg={3} key={product.id}>
        <ProductCard product={product} />
      </Grid>
    )
  }

  return (
    <StyledPage>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {products.map((product) => renderProductCard(product))}
      </Grid>
      <Footer>
        <Pagination count={5} variant="outlined" color="primary" />
      </Footer>
    </StyledPage>
  );
}

export default Index;

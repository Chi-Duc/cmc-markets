import React, { useState, useEffect, ChangeEvent } from 'react';
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
  const [pageCount, setPageCount] = useState<number>(0);

  const retrieveProducts = async (pageIndex: number = 0, pageSize: number = 12) => {
    const currentPageNumber = pageIndex + 1;
    const firstProductPage = await getProducts(pageIndex, pageSize);
    
    setProducts(firstProductPage.products);
    if (firstProductPage.hasMore && pageCount <= currentPageNumber) {
      setPageCount(currentPageNumber + 1);
    }    
  };

  useEffect(() => {    
    retrieveProducts();
  }, []);

  const renderProductCard = (product: TProduct) => {
    return (      
      <Grid item xs={12} sm={6} lg={3} key={product.id}>
        <ProductCard product={product} />
      </Grid>
    )
  }

  const handlePageNavigation = (event: ChangeEvent<unknown>, page: number) => {
    retrieveProducts(page - 1);
  }

  return (
    <StyledPage>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {products.map((product) => renderProductCard(product))}
      </Grid>
      <Footer>
        {pageCount > 0 && (
          <Pagination count={pageCount} variant="outlined" color="primary" onChange={handlePageNavigation}/>
        )}
      </Footer>
    </StyledPage>
  );
}

export default Index;

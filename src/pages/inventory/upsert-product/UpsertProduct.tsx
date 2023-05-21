import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../../../interfaces/product';

export const UpsertProduct = () => {
  const location = useLocation();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    location.state && setProduct(location.state);
  }, []);

  return <div>{product?.productDescription}</div>;
};

import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../repository/productRepository';
import { handleErrorResponse } from '../services/error.Service';

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    onError: (error) => handleErrorResponse(error, '')
  });
};

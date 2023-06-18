import { useQuery } from '@tanstack/react-query';
import { handleErrorResponse } from '../services/error.Service';
import { GetAvailableDiscounts } from '../repository/saleRepository';

export const useGetDiscountsByUser = (username: string) => {
  return useQuery({
    queryKey: ['discounts', username],
    queryFn: () => GetAvailableDiscounts(username),
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 43200000,
    staleTime: 43200000
  });
};

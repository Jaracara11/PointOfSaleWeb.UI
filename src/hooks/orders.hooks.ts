import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleErrorResponse } from '../services/error.Service';
import {
  GetAvailableDiscounts,
  checkoutOrder,
  getBestSellerProducts,
  getOrderByID,
  getRecentOrders,
  getTotalSalesOfTheDay
} from '../repository/orderRepository';
import { swalMessageAlert } from '../services/swal.service';

export const useGetDiscountsByUser = (username: string) => {
  return useQuery({
    queryKey: ['discounts', username],
    queryFn: () => GetAvailableDiscounts(username),
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 43200000,
    staleTime: 43200000
  });
};

export const useGetRecentOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getRecentOrders,
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 43200000,
    staleTime: 43200000
  });
};

export const useGetBestSellerProducts = () => {
  return useQuery({
    queryKey: ['bestSellers'],
    queryFn: getBestSellerProducts,
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 43200000,
    staleTime: 43200000
  });
};

export const useGetOrderByID = (orderID: string) => {
  return useQuery({
    enabled: false,
    queryKey: ['order', orderID],
    queryFn: () => getOrderByID(orderID),
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 43200000,
    staleTime: 43200000
  });
};

export const useGetSalesOfTheDay = () => {
  return useQuery({
    queryKey: ['salesToday'],
    queryFn: getTotalSalesOfTheDay,
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 43200000,
    staleTime: 43200000
  });
};

export const useNewOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkoutOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['orders']);
      queryClient.invalidateQueries(['salesToday']);
      swalMessageAlert('Transaction Completed', 'success');
    },
    onError: (error) => handleErrorResponse(error, 'OrdersError')
  });
};

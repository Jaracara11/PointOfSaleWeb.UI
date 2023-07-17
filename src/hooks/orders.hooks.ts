import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleErrorResponse } from '../services/error.Service';
import {
  GetAvailableDiscounts,
  cancelOrder,
  checkoutOrder,
  getOrderByID,
  getOrdersByDate,
  getRecentOrders,
  getSalesByDate,
  getTotalSalesOfTheDay
} from '../repository/orderRepository';
import { swalMessageAlert } from '../services/swal.service';

export const useGetDiscountsByUser = (username: string) => {
  return useQuery({
    queryKey: ['discounts', username],
    queryFn: () => GetAvailableDiscounts(username),
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 43200000,
    staleTime: 43200000,
    retry: false
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

export const useGetOrdersByDate = (initialDate: Date, finalDate: Date) => {
  return useQuery({
    queryKey: ['orderByDate'],
    queryFn: () => getOrdersByDate(initialDate, finalDate),
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 43200000,
    staleTime: 43200000,
    enabled: false,
    retry: false
  });
};

export const useGetOrderByID = (orderID: string) => {
  return useQuery({
    enabled: false,
    queryKey: ['order', orderID],
    queryFn: () => getOrderByID(orderID),
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 43200000,
    staleTime: 43200000,
    retry: false
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

export const useGetSalesByDate = (initialDate: Date, finalDate: Date) => {
  return useQuery({
    queryKey: ['salesByDate'],
    queryFn: () => getSalesByDate(initialDate, finalDate),
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 43200000,
    staleTime: 43200000,
    enabled: false,
    retry: false
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
      queryClient.invalidateQueries(['orderByDate']);
      queryClient.invalidateQueries(['salesByDate']);
      swalMessageAlert('Transaction Completed', 'success');
    },
    onError: (error) => handleErrorResponse(error, 'OrdersError')
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['orders']);
      queryClient.invalidateQueries(['salesToday']);
      queryClient.invalidateQueries(['orderByDate']);
      queryClient.invalidateQueries(['salesByDate']);
      swalMessageAlert(`Order cancelled successfully`, 'info');
    },
    onError: (error) => handleErrorResponse(error, 'OrdersError')
  });
};

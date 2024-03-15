import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleErrorResponse } from '../services/error.service';
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
    refetchOnWindowFocus: false,
    retry: false
  });
};

export const useGetRecentOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getRecentOrders
  });
};

export const useGetOrdersByDate = (initialDate: Date, finalDate: Date) => {
  return useQuery({
    queryKey: ['ordersByDate'],
    queryFn: () => getOrdersByDate(initialDate, finalDate),
    enabled: false,
    retry: false
  });
};

export const useGetOrderByID = (orderID: string) => {
  return useQuery({
    enabled: false,
    queryKey: ['order', orderID],
    queryFn: () => getOrderByID(orderID),
    retry: false
  });
};

export const useGetSalesOfTheDay = () => {
  return useQuery({
    queryKey: ['salesToday'],
    queryFn: getTotalSalesOfTheDay
  });
};

export const useGetSalesByDate = (initialDate: Date, finalDate: Date) => {
  return useQuery({
    queryKey: ['salesByDate'],
    queryFn: () => getSalesByDate(initialDate, finalDate),
    enabled: false,
    retry: false
  });
};

export const useNewOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkoutOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['salesToday'] });
      queryClient.invalidateQueries({ queryKey: ['ordersByDate'] });
      queryClient.invalidateQueries({ queryKey: ['salesByDate'] });
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
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['salesToday'] });
      queryClient.invalidateQueries({ queryKey: ['ordersByDate'] });
      queryClient.invalidateQueries({ queryKey: ['salesByDate'] });

      swalMessageAlert(`Order cancelled successfully`, 'info');
    },
    onError: (error) => handleErrorResponse(error, 'OrdersError')
  });
};

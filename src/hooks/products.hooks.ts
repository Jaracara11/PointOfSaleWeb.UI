import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getBestSellerProducts,
  getProductsSoldByDate,
  updateProduct
} from '../repository/productRepository';
import { handleErrorResponse } from '../services/error.service';
import { swalMessageAlert } from '../services/swal.service';

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    meta: {
      errorMessage: ''
    }
  });
};

export const useGetBestSellerProducts = () => {
  return useQuery({
    queryKey: ['bestSellers'],
    queryFn: getBestSellerProducts
  });
};

export const useGetProductsSoldByDate = (initialDate: Date, finalDate: Date) => {
  return useQuery({
    queryKey: ['productsByDate'],
    queryFn: () => getProductsSoldByDate(initialDate, finalDate),
    enabled: false,
    retry: false
  });
};

export const useSaveNewProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      swalMessageAlert(`New product ${data.productName} added successfully!`, 'success');
    },
    onError: (error) => handleErrorResponse(error, 'ProductError')
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      swalMessageAlert(`Product updated successfully`, 'info');
    },
    onError: (error) => handleErrorResponse(error, 'ProductError')
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      swalMessageAlert(`Product deleted successfully`, 'info');
    },
    onError: (error) => handleErrorResponse(error, 'ProductError')
  });
};

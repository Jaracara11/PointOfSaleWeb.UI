import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct
} from '../repository/productRepository';
import { handleErrorResponse } from '../services/error.Service';
import { swalMessageAlert } from '../services/swal.service';

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 3600000,
    staleTime: 3600000
  });
};

export const useSaveNewProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['products']);
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
      queryClient.invalidateQueries(['products']);
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
      queryClient.invalidateQueries(['products']);
      swalMessageAlert(`Product deleted successfully`, 'info');
    },
    onError: (error) => handleErrorResponse(error, 'ProductError')
  });
};

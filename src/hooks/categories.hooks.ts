import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory
} from '../repository/categoryRepository';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleErrorResponse } from '../services/error.Service';
import { swalMessageAlert } from '../services/swal.service';

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    onError: (error) => handleErrorResponse(error, '')
  });
};

export const useSaveNewCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['categories']);
      swalMessageAlert(`New category ${data.categoryName} added successfully!`, 'success');
    },
    onError: (error) => handleErrorResponse(error, 'CategoryError')
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      swalMessageAlert(`Category updated successfully`, 'info');
    },
    onError: (error) => handleErrorResponse(error, 'CategoryError')
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      swalMessageAlert(`Category deleted successfully`, 'info');
    },
    onError: (error) => handleErrorResponse(error, 'CategoryError')
  });
};

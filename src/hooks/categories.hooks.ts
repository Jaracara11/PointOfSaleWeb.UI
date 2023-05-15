import {
  addCategory,
  getAllCategories,
  updateCategory
} from '../repository/categoryRepository';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleErrorResponse } from '../services/error.Service';
import { swalSuccessAlert } from '../services/swal.service';

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
      swalSuccessAlert(`New category ${data.categoryName} added successfully!`);
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
      swalSuccessAlert(`Category updated successfully`);
    },
    onError: (error) => handleErrorResponse(error, 'CategoryError')
  });
};

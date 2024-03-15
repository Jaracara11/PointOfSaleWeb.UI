import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleErrorResponse } from '../services/error.service';
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserByUsername,
  getUserRoles,
  updateUser
} from '../repository/userRepository';
import { swalMessageAlert } from '../services/swal.service';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false
  });
};

export const useGetSingleUser = (username: string) => {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => getUserByUsername(username),
    refetchOnWindowFocus: false,
    retry: false
  });
};

export const useGetRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: getUserRoles,
    refetchOnWindowFocus: false
  });
};

export const useSaveNewUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      swalMessageAlert(`New user ${data.username} added successfully!`, 'success');
    },
    onError: (error) => handleErrorResponse(error, 'UserError')
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      swalMessageAlert(`User updated successfully`, 'info');
    },
    onError: (error) => handleErrorResponse(error, 'UserError')
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      swalMessageAlert(`User deleted successfully`, 'info');
    },
    onError: (error) => handleErrorResponse(error, 'UserError')
  });
};

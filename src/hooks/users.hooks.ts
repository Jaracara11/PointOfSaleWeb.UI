import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleErrorResponse } from '../services/error.Service';
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
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 3600000,
    staleTime: 3600000
  });
};

export const useGetSingleUser = (username: string) => {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => getUserByUsername(username),
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 3600000
  });
};

export const useSaveNewUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['users']);
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
      queryClient.invalidateQueries(['users']);
      swalMessageAlert(`User updated successfully`, 'info');
    },
    onError: (error) => handleErrorResponse(error, 'UserError')
  });
};

export const useGetRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: getUserRoles,
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 3600000
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      swalMessageAlert(`User deleted successfully`, 'info');
    },
    onError: (error) => handleErrorResponse(error, 'UserError')
  });
};

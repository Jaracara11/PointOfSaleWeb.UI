import { useQuery } from '@tanstack/react-query';
import { handleErrorResponse } from '../services/error.Service';
import { getAllUsers, getUserRoles } from '../repository/userRepository';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    onError: (error) => handleErrorResponse(error, ''),
    cacheTime: 3600000
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

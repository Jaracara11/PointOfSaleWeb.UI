import { useQuery } from '@tanstack/react-query';
import { handleErrorResponse } from '../services/error.Service';
import { getAllUsers } from '../repository/userRepository';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    onError: (error) => handleErrorResponse(error, '')
  });
};

import { useRouteError } from 'react-router-dom';
import { handleErrorResponse } from '../../../services/error.Service';

export const ErrorRouterView = () => {
  const error = useRouteError();
  error && handleErrorResponse(error, '');
};

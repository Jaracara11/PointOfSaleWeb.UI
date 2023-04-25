import { useRouteError } from 'react-router-dom';
import { handleErrorResponse } from '../../../services/error.Service';

export const ErrorRouterView = () => {
  const error = useRouteError();
  return error ? <>{handleErrorResponse(error, '')}</> : <p>Unknown Error.</p>;
};

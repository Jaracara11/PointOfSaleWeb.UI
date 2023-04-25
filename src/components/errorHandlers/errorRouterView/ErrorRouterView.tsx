import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ErrorRouterView = () => {
  const error = useRouteError();

  return (
    <div>
      <p className="alert alert-danger mt-1" role="alert">
        {isRouteErrorResponse(error)
          ? error.error?.message
          : 'Unknown error message'}
      </p>
    </div>
  );
};

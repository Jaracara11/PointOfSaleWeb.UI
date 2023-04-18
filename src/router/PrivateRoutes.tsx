import { Outlet } from 'react-router-dom';
import { getUserAuth } from '../services/user.Service';
import { Login } from '../pages/login/Login';

export const PrivateRoutes = () => {
  const user = getUserAuth();

  return user ? <Outlet /> : <Login />;
};

import { Outlet } from 'react-router-dom';
import { Login } from '../pages/login/Login';
import { UserAuth } from '../context/UserContext';

export const PrivateRoutes = () => {
  const { user } = UserAuth();

  return user ? <Outlet /> : <Login />;
};

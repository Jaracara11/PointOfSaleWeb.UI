import { Outlet } from 'react-router-dom';
import { Login } from '../pages/login/Login';
import { useUserStore } from '../stores/user.store';

export const PrivateRoutes = () => {
  const { user } = useUserStore();

  return user ? <Outlet /> : <Login />;
};

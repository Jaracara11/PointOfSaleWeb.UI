import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/login/Login';
import { Home } from '../pages/home/Home';
import { Inventory } from '../pages/inventory/Inventory';
import { NotFound } from '../pages/notFound/NotFound';
import { PrivateRoutes } from './PrivateRoutes';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/home" element={<Home />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/inventory" element={<Inventory />} />
      </Route>
    </Routes>
  );
};

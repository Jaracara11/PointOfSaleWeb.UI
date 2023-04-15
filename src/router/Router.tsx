import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/login/Login';
import { Home } from '../pages/home/Home';
import { Inventory } from '../pages/inventory/Inventory';
import { NotFound } from '../pages/notFound/NotFound';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

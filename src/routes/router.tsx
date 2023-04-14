import { Routes, Route } from 'react-router-dom';
import { NotFound } from '../pages/notFound/NotFound';
import { Login } from '../pages/login/Login';
import { Home } from '../pages/home/Home';

export const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      {/* <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route> */}
    </Routes>
  );
};

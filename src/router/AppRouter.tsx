import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import { Login } from '../pages/login/Login';
import { Home } from '../pages/home/Home';
import { Inventory } from '../pages/inventory/Inventory';
import { NotFound } from '../pages/notFound/NotFound';
import { PrivateRoutes } from './PrivateRoutes';
import { RootLayout } from '../layouts/RootLayout';
import { Categories } from '../pages/categories/Categories';
import { Products } from '../pages/products/Products';

export const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<RootLayout />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route element={<Inventory />} />
            <Route path="/inventory">
              <Route index element={<Inventory />} />
              <Route path="categories" element={<Categories />} />
              <Route path="products" element={<Products />} />
            </Route>
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import { Login } from '../pages/login/Login';
import { Home } from '../pages/home/Home';
import { NotFound } from '../pages/notFound/NotFound';
import { PrivateRoutes } from './PrivateRoutes';
import { RootLayout } from '../layouts/RootLayout';
import { Categories } from '../pages/inventory/categories/Categories';
import { Products } from '../pages/inventory/products/Products';
import { Sales } from '../pages/sales/Sales';
import { UserManagement } from '../pages/userManagement/UserManagement';
import { Invoice } from '../pages/invoice/Invoice';

export const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<RootLayout />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/sales" element={<Sales />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/user-management" element={<UserManagement />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

import { Outlet } from 'react-router-dom';
import { SidebarMenu } from '../components/sidebarMenu/SidebarMenu';

export const RootLayout = () => {
  return (
    <div className="root-layout">
      <SidebarMenu />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

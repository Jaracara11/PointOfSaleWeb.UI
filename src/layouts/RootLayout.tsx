import './rootLayout.css';
import { Outlet } from 'react-router-dom';
import { SidebarMenu } from '../components/sidebarMenu/SidebarMenu';

export const RootLayout = () => {
  return (
    <div className="root-layout">
      <SidebarMenu />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

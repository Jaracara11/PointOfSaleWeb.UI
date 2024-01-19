import './rootLayout.css';
import { Outlet } from 'react-router-dom';
import { SidebarMenu } from '../components/sidebarMenu/SidebarMenu';
import { UserAuth } from '../context/UserContext';

export const RootLayout = () => {
  const { user } = UserAuth() || {};

  return (
    <div className="root-layout">
      <aside>{user && <SidebarMenu />}</aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

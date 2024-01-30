import './rootLayout.css';
import { Outlet } from 'react-router-dom';
import { SidebarMenu } from '../components/sidebarMenu/SidebarMenu';
import { useUserStore } from '../stores/user.store';

export const RootLayout = () => {
  const { user } = useUserStore();

  return (
    <div className="root-layout">
      <aside>{user && <SidebarMenu />}</aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

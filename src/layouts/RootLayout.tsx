import './rootLayout.css';
import { Outlet } from 'react-router-dom';
import { SidebarMenu } from '../components/sidebarMenu/SidebarMenu';
import { useIsFetching } from '@tanstack/react-query';
import { LoadingSpinner } from '../components/loadingSpinner/LoadingSpinner';

export const RootLayout = () => {
  const isFetching = useIsFetching();

  return isFetching ? (
    <LoadingSpinner />
  ) : (
    <div className="root-layout">
      <aside>
        <SidebarMenu />
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

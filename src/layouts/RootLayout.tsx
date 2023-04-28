import './rootLayout.css';
import { Outlet, useNavigation } from 'react-router-dom';
import { SidebarMenu } from '../components/sidebarMenu/SidebarMenu';
import { LoadingSpinner } from '../components/loadingSpinner/LoadingSpinner';

export const RootLayout = () => {
  const { state } = useNavigation();

  return (
    <div className="root-layout">
      <SidebarMenu />
      <main>{state === 'loading' ? <LoadingSpinner /> : <Outlet />}</main>
    </div>
  );
};

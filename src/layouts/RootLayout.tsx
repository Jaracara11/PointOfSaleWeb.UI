import './rootLayout.css';
import { Outlet } from 'react-router-dom';
import { SidebarMenu } from '../components/sidebarMenu/SidebarMenu';

export const RootLayout = () => {
  return (
    <div className="root-layout">
      <div className="row no-gutters">
        <div className="col-3">
          <SidebarMenu />
        </div>
        <div className="col-9">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

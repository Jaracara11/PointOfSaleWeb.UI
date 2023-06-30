import './home.css';
import { BestSellerProducts } from '../../components/statistics/bestSellerProducts/BestSellerProducts';
import { RecentOrders } from '../../components/statistics/recentOrders/RecentOrders';
import { SalesOfTheDay } from '../../components/statistics/salesOfTheDay/SalesOfTheDay';

export const Home = () => {
  return (
    <div className="home-container">
      <div className="left-side">
        <BestSellerProducts />
      </div>
      <div className="right-side">
        <RecentOrders />
        <SalesOfTheDay />
      </div>
    </div>
  );
};

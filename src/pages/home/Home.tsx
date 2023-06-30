import './home.css';
import { BestSellerProducts } from '../../components/statistics/bestSellerProducts/BestSellerProducts';
import { RecentOrders } from '../../components/statistics/recentOrders/RecentOrders';
import { SalesOfTheDay } from '../../components/statistics/salesOfTheDay/SalesOfTheDay';
import { ProductAvailability } from '../../components/statistics/productAvailability/ProductAvailability';

export const Home = () => {
  return (
    <div className="home-container">
      <div className="left-side">
        <BestSellerProducts />
        <ProductAvailability />
      </div>
      <div className="right-side">
        <RecentOrders />
        <SalesOfTheDay />
      </div>
    </div>
  );
};

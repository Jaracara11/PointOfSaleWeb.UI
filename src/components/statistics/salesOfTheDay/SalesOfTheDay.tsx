import { useGetSalesOfTheDay } from '../../../hooks/orders.hooks';
import { LoadingSpinner } from '../../loadingSpinner/LoadingSpinner';

export const SalesOfTheDay = () => {
  const salesOfTheDayQuery = useGetSalesOfTheDay();

  return salesOfTheDayQuery.isPending ? (
    <LoadingSpinner />
  ) : (
    <div>
      <div className="card">
        <h4 className="title">Total sales of the day</h4>
        <h3 className="text-muted">
          <strong>${salesOfTheDayQuery.data && salesOfTheDayQuery.data.toString()}</strong>
        </h3>
      </div>
    </div>
  );
};

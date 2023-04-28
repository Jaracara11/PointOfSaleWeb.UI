import { useNavigation, Outlet } from 'react-router-dom';
import { LoadingSpinner } from '../loadingSpinner/LoadingSpinner';

export const AppWrapper = () => {
  const { state } = useNavigation();

  return state === 'loading' ? <LoadingSpinner /> : <Outlet />;
};

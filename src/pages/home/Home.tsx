import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export const Home = () => {
  const msg = useContext(UserContext);

  return <>Home Page</>;
};

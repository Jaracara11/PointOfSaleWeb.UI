import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export const Home = () => {
  const { user } = useContext(UserContext) ?? {};

  return <>Home Page</>;
};

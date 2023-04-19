import './login.css';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidation } from '../../services/yupValidation.service';
import { UserLogin } from '../../interfaces/UserLogin';
import { ErrorView } from '../../components/errorView/ErrorView';
import { swalErrorAlert } from '../../services/swal.service';
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner';
import { UserContext } from '../../context/UserContext';

export const Login = () => {
  const [loadingData, setLoadingData] = useState(false);
  const { signIn } = useContext(UserContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginValidation)
  });

  const submitLogin: any = async (userData: UserLogin) => {
    try {
      setLoadingData(true);
      await signIn(userData);
      navigate('/home');
    } catch (error: any) {
      swalErrorAlert(error.UserError[0], 'Login Error');
    } finally {
      setLoadingData(false);
    }
  };

  return loadingData ? (
    <LoadingSpinner />
  ) : (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <form className="card-body" onSubmit={handleSubmit(submitLogin)}>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Username..."
              {...register('username')}
            />
            <ErrorView error={errors.username} />
            <input
              type="password"
              className="form-control"
              placeholder="Password..."
              {...register('password')}
            />
            <ErrorView error={errors.password} />
          </div>
          <button className="btn btn-dark">Login</button>
        </form>
      </div>
    </div>
  );
};

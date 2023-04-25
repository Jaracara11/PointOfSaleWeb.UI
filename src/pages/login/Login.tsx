import './login.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidation } from '../../services/yupValidation.service';
import { UserLogin } from '../../interfaces/UserLogin';
import { ErrorInputView } from '../../components/errorHandlers/errorInputView/ErrorInputView';
import { swalErrorAlert } from '../../services/swal.service';
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner';
import { UserAuth } from '../../context/UserContext';

export const Login = () => {
  const [loadingData, setLoadingData] = useState(false);
  const { signIn } = UserAuth();

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
      console.log(error);
      swalErrorAlert(error.status, error.data.UserError[0], error.statusText);
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
            <ErrorInputView error={errors.username} />
            <input
              type="password"
              className="form-control"
              placeholder="Password..."
              {...register('password')}
            />
            <ErrorInputView error={errors.password} />
          </div>
          <button className="btn btn-dark">Login</button>
        </form>
      </div>
    </div>
  );
};

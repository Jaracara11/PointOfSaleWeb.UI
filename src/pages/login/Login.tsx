import './login.css';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidation } from '../../services/yupValidation.service';
import { UserLogin } from '../../interfaces/user/UserLogin';
import { ErrorInputView } from '../../components/errorInputView/ErrorInputView';
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner';
import { UserAuth } from '../../context/UserContext';
import { handleErrorResponse } from '../../services/error.Service';

export const Login = () => {
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const { signIn } = UserAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginValidation)
  });

  const submitLogin: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoadingData(true);

      const userData: UserLogin = {
        username: data.username,
        password: data.password
      };

      await signIn(userData);

      navigate('/home');
    } catch (error: any) {
      handleErrorResponse(error, 'UserError');
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

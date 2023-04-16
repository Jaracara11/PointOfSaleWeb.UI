import './login.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidation } from '../../services/yupValidation.service';
import { UserLogin } from '../../interfaces/UserLogin';

export const Login = () => {
  const [loadingData, setLoadingData] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginValidation)
  });

  const submitAuth: any = async (userData: UserLogin) => {
    setLoadingData(true);
    console.log(userData);
    setLoadingData(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <div className="card-body">
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  );
};

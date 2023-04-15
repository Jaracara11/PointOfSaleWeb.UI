import './login.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [loadingData, setLoadingData] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInValidation),
  });

  return (
    <div className="container">
      <div className="card">
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
function yupResolver(signInValidation: any): import("react-hook-form").Resolver<import("react-hook-form").FieldValues, any> | undefined {
  throw new Error('Function not implemented.');
}


import './login.css';

export const Login = () => {
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

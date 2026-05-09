
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import '../AdminLogin.css';

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const SECRET_EMAIL = 'maraniere@gmail.com';
  const SECRET_PASSWORD = 'mara17niere';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (credentials.email === SECRET_EMAIL && credentials.password === SECRET_PASSWORD) {
        localStorage.setItem('adminToken', 'super-secret-admin-token-2024');
        window.location.href = '/admin';
      } else {
        setError('Invalid credentials!');
      }
      setLoading(false);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        
        <div className="text-center mb-4">
          <div className="icon-circle">
            <i className="bi bi-shield-lock-fill fs-1"></i>
          </div>
          <h2>Admin Portal</h2>
          <p>Secure access required</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={credentials.email}
            onChange={handleChange}
            required
          />

          <div className="password-box">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />

            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {error && <div className="error-box">{error}</div>}

          <button disabled={loading}>
            {loading ? 'Entering...' : 'Enter Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
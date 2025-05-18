import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ✅ added
import authService from '../../services/authService';

const Login = () => {
  const { t } = useTranslation(); // ✅ added
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Submitting login with:', formData);

      const result = await authService.login(formData);
      console.log('Login result:', result);

      const data = result.data || result;

      if (data.token && data.user) {
        const { token, user } = data;

        console.log('Login successful!');
        console.log('User Role:', user.role);
        console.log('JWT Token:', token);

        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);

        switch (user.role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'owner':
            navigate('/owner/dashboard');
            break;
          case 'customer':
            navigate('/');
            break;
          default:
            console.warn('Unknown role:', user.role);
            setError(t('login.errors.unknownRole'));
        }
      } else {
        console.warn('Login failed response:', data);
        setError(data.message || t('login.errors.failed'));
      }
    } catch (err) {
      console.error('Login error caught in catch block:', err);
      setError(t('login.errors.generic'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">{t('login.title')}</h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('login.email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('login.password')}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {t('login.submit')}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          {t('login.noAccount')}{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {t('login.register')}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type LoginInput = {
  usernameOrEmail: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

const Login = () => {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState<LoginInput>({
    usernameOrEmail: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setUserInput((previousInput) => ({
      ...previousInput,
      [event.target.name]: event.target.value,
    }));
  };

  const loginUser = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setErrorMessage('');

    if (
      userInput.usernameOrEmail.trim() === '' ||
      userInput.password.trim() === ''
    ) {
      setErrorMessage('Please complete all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        'http://localhost:5089/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInput),
        },
      );

      if (!response.ok) {
        throw new Error(
          'Invalid username, email, or password.',
        );
      }

      const data: LoginResponse = await response.json();

      localStorage.setItem('token', data.token);
      navigate('/profile');
    } catch (error) {
      if (error instanceof TypeError) {
        setErrorMessage(
          'The backend server is not available yet.',
        );
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle =
    'w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200';

  const labelStyle =
    'mb-1 block text-xs font-semibold text-gray-700';

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-6">
      <section className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-5 text-center text-2xl font-bold text-gray-800">
          Eteria Character Keeper
        </h1>

        <form onSubmit={loginUser} className="space-y-4">
          <div>
            <label
              htmlFor="usernameOrEmail"
              className={labelStyle}
            >
              Username or Email
            </label>

            <input
              id="usernameOrEmail"
              name="usernameOrEmail"
              type="text"
              placeholder="Enter username or email"
              value={userInput.usernameOrEmail}
              onChange={handleChange}
              autoComplete="username"
              className={inputStyle}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className={labelStyle}
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={userInput.password}
              onChange={handleChange}
              autoComplete="current-password"
              className={inputStyle}
              required
            />
          </div>

          {errorMessage && (
            <p
              className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700"
              role="alert"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/signup"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Create New Account
          </Link>
        </div>

        <p className="mt-3 text-center text-xs text-gray-500">
          About Eteria Project
        </p>
      </section>
    </main>
  );
};

export default Login;
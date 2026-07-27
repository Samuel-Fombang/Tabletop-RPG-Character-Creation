import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import { Link, useNavigate } from 'react-router-dom';

type RegistrationInput = {
  username: string;
  email: string;
  name: string;
  birthday: string;
  password: string;
  passwordConfirmation: string;
};

const usernamePattern = /^[A-Za-zА-Яа-яЁё0-9]{2,12}$/;
const namePattern = /^[A-Za-zА-Яа-яЁё]{2,12}$/;

const birthdayPattern =
  /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])$/;

const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,30}$/;

const Signup = () => {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState<RegistrationInput>({
    username: '',
    email: '',
    name: '',
    birthday: '',
    password: '',
    passwordConfirmation: '',
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setUserInput((previousInput) => ({
      ...previousInput,
      [event.target.name]: event.target.value,
    }));
  };

  const registerUser = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setMessage('');

    if (!usernamePattern.test(userInput.username)) {
      setMessage(
        'Username must contain 2 to 12 letters or numbers.',
      );
      return;
    }

    if (!namePattern.test(userInput.name)) {
      setMessage('Name must contain 2 to 12 letters only.');
      return;
    }

    if (!birthdayPattern.test(userInput.birthday)) {
      setMessage('Birthday must use the format dd.mm.');
      return;
    }

    if (!passwordPattern.test(userInput.password)) {
      setMessage(
        'Password must contain 6 to 30 letters and numbers, including at least one letter and one number.',
      );
      return;
    }

    if (
      userInput.password !==
      userInput.passwordConfirmation
    ) {
      setMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        'http://localhost:5089/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: userInput.username,
            email: userInput.email,
            name: userInput.name,
            birthday: userInput.birthday,
            password: userInput.password,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Registration failed.');
      }

      navigate('/login');
    } catch (error) {
      if (error instanceof TypeError) {
        setMessage('The backend server is not available yet.');
      } else if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Registration failed. Please try again.');
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
          Registration Form
        </h1>

        <form onSubmit={registerUser} className="space-y-3">
          <div>
            <label htmlFor="username" className={labelStyle}>
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username"
              value={userInput.username}
              onChange={handleChange}
              minLength={2}
              maxLength={12}
              required
              className={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={userInput.email}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="name" className={labelStyle}>
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter name"
              value={userInput.name}
              onChange={handleChange}
              minLength={2}
              maxLength={12}
              required
              className={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="birthday" className={labelStyle}>
              Birthday
            </label>

            <input
              id="birthday"
              name="birthday"
              type="text"
              placeholder="dd.mm"
              value={userInput.birthday}
              onChange={handleChange}
              maxLength={5}
              required
              className={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={userInput.password}
              onChange={handleChange}
              minLength={6}
              maxLength={30}
              required
              className={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor="passwordConfirmation"
              className={labelStyle}
            >
              Password Confirmation
            </label>

            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              placeholder="Confirm password"
              value={userInput.passwordConfirmation}
              onChange={handleChange}
              minLength={6}
              maxLength={30}
              required
              className={inputStyle}
            />
          </div>

          {message && (
            <p
              className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700"
              role="alert"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-green-600 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Already have an account? Log In
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Signup;
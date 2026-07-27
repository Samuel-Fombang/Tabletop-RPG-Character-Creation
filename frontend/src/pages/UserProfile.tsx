import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>User Profile</h1>

      <p>Username: Samuel</p>
      <p>Email: test@example.com</p>

      <button type="button" onClick={logoutUser}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
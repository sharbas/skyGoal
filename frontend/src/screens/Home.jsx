import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action here
    dispatch(logout());
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };
  return (
    <div className="relative h-screen flex flex-col items-center justify-center">
      
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0"
        style={{ backgroundImage: `url('/felix-rostig-UmV2wr-Vbq8-unsplash.jpg')` }}
      ></div>
      <div className="relative z-10 text-center text-white">
        <div className="flex justify-center p-4">
          <button className="focus:outline-none" onClick={handleProfileClick}>
            {/* Replace 'your-profile-image.jpg' with the actual path to your profile image */}
            <img
              src="/profilelogo.png"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </button>
        </div>
        <h1 className="text-4xl font-bold mb-6">Welcome SkyGoal</h1>
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

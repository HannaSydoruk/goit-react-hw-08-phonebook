import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectUserData,
} from '../../redux/auth/authSlice.selectors';
import { apiLogoutUser } from '../../redux/auth/authSlice';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const isLoading = useSelector(selectIsLoading);

  const handleLogout = () => dispatch(apiLogoutUser());

  return (
    <div>
      <p>{userData.email}</p>
      <button onClick={handleLogout} disabled={isLoading} type="button">
        Logout
      </button>
    </div>
  );
};

export default UserMenu;

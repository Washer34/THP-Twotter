import React from 'react';
import { useAtom } from 'jotai';
import { loginAtom } from './loginAtom';
import Cookies from 'js-cookie';

function LogoutButton() {
  const [loginState, setLoginState] = useAtom(loginAtom);

  const handleLogout = () => {
    Cookies.remove('userInfo');
    setLoginState({
      isLoggedIn: false,
      userId: null,
      username: '',
      token: null
    });
  };

  return (
    <>
      {loginState.isLoggedIn && (
        <button onClick={handleLogout} className='btn btn-secondary'>
          Se déconnecter
        </button>
      )}
    </>
  );
}

export default LogoutButton;
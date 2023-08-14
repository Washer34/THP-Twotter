import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { loginAtom } from '../components/auth/loginAtom.js';
import Cookies from 'js-cookie'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setLoginState] = useAtom(loginAtom);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      identifier: username,
      password: password
    };

    try {
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const responseData = await response.json();
        const jwtToken = responseData.jwt;
        const userInfo = {
          token: jwtToken,
          username: responseData.user.username,
          userId: responseData.user.id
        };
        Cookies.set('userInfo', JSON.stringify(userInfo));
        setLoginState({
          isLoggedIn: true,
          userId: responseData.user.id,
          username: responseData.user.username,
          token: jwtToken
        });
        console.log(jwtToken);
        console.log(responseData.user.id);
        navigate('/');
      } else {
        throw new Error('Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la requête: ', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nom d'utilisateur :
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mot de passe :
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Connexion
        </button>
      </form>
    </div>
  );
};

export default Login;

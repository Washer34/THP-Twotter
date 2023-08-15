import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { loginAtom } from '../components/auth/loginAtom';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Author = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [loginState, setLoginState] = useAtom(loginAtom)
  const { userid } = useParams();
  const [userInfo, setUserInfo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDatas = {
      username: username,
      email: email,
    };

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/users/${userid}`, {
          method: 'put',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newDatas)
        });
        if (response.ok) {
          const responseData = await response.json();
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
        } else {
          throw new Error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error('Erreur de requête : ', error)
      }
    };
    fetchData()
  };

  useEffect(() => {

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/users/${userid}?populate=*`, {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${loginState.token}`,
            'Content-Type': 'application/json'
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUserInfo(userData);
        } else {
          throw new Error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error('Erreur de requête : ', error);
      }
    };
    fetchUserInfo();
  }, [userid, loginState.token]);

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('fr-FR', options).format(new Date(date));
  };

  if (!userInfo) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Profil de {userInfo.username}</h2>
      <p>Nom d'utilisateur : {userInfo.username}</p>
      <p>Email : {userInfo.email}</p>
      {userid == loginState.userId && (
        <div>
          <h3>Modifier votre profil:</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
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
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Enregistrer
            </button>
          </form>
        </div>
      )}
      <p>{userInfo.username} a posté {userInfo.posts.length} twotts :</p>
      {userInfo.posts.map((post, index) => {
        const formattedDate = formatDate(post.createdAt);
        return (
          <Card key={index} style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Subtitle>{formattedDate}</Card.Subtitle>
              <Card.Text>
                <div>
                  {post.text}
                </div>
              </Card.Text>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon className='btn-like' icon={faThumbsUp} style={{ color: "#f6f6f6" }} /> {post.like}
              </div>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  );
};

export default Author;
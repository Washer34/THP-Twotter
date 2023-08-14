import React from 'react';
import { useAtom } from 'jotai';
import { loginAtom } from '../components/auth/loginAtom';
import PostForm from '../components/posts/PostForm';
import PostsList from '../components/posts/PostList';


const Accueil = () => {
  const [loginState] = useAtom(loginAtom);

  return (
    <div className="container mt-5">
      {loginState.isLoggedIn ? (
        <div>
          <p>Bonjour {loginState.username}, qu'allez-vous poster aujourd'hui ?</p>
          <PostsList />
        </div>
      ) : (
        <div>
          Bonjour et bienvenue sur Twotter. Inscrivez-vous pour poster sur la Twottosphere !
        </div>
      )
      }
    </div>
  );
}

export default Accueil;

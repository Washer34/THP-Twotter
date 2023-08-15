import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useAtom } from 'jotai';
import { loginAtom } from '../auth/loginAtom';
import PostForm from './PostForm';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';

const PostsList = () => {
  const [posts, setPosts] = useState([])
  const [loginState] = useAtom(loginAtom);

  const reloadPostsList = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/posts/?populate=*', {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${loginState.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const jsonData = await response.json();
        const reversedData = jsonData.data.reverse();
        setPosts(reversedData);
      } else {
        throw new Error('Erreur lors de la requête');
      }
    } catch (error) {
      console.error('Erreur de requête : ', error);
    }
  };

  // FONCTION SUPPRIMER 
  const handleDelete = (postId) => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/posts/${postId}`, {
          method: 'delete',
          headers: {
            'Authorization': `Bearer ${loginState.token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const jsonData = await response.json();
          console.log("post supprimé")
          reloadPostsList();
        } else {
          throw new Error('Erreur lors de la requête')
        }
      } catch (error) {
        console.error('Erreur de requête: ', error)
      }
    };
    fetchData();
  }

  //FONCTION LIKE
  const handleLike = async (postId, likesCount) => {
    try {
      const response = await fetch(`http://localhost:1337/api/posts/${postId}?populate=*`, {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${loginState.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des détails du post');
      }

      const postData = await response.json();
      const currentUsersLikes = postData.data.attributes.users_likes.data.map(user => user.id.toString());

      const userHasLiked = currentUsersLikes.some(userId => userId === loginState.userId.toString());

      const newUsersLikes = userHasLiked
        ? currentUsersLikes.filter(userId => userId !== loginState.userId.toString())
        : [...currentUsersLikes, loginState.userId.toString()];


      const likeData = {
        "data": {
          "like": userHasLiked ? likesCount - 1 : likesCount + 1,
          "users_likes": newUsersLikes
        }
      };

      const updateResponse = await fetch(`http://localhost:1337/api/posts/${postId}`, {
        method: 'put',
        headers: {
          'Authorization': `Bearer ${loginState.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(likeData)
      });

      if (updateResponse.ok) {
        reloadPostsList();
      } else {
        throw new Error('Erreur lors de la mise à jour du like');
      }
    } catch (error) {
      console.error('Erreur lors de la requête: ', error);
    }
  };


  // USE EFFECT POUR AFFICHAGE DE LA LISTE 
  useEffect(() => {
    reloadPostsList();
  }, []);

  return (
    <div className="container mt-5">
      <PostForm reloadPostsList={reloadPostsList} />
      <p>Voici la liste des posts</p>
      <>
        {posts.map((post, index) => {
          const userHasLiked = post.attributes.users_likes.data.some(user => user.id === loginState.userId);
          return (
            <Card key={index} style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>
                  <Link to={`/profil/${post.attributes.user.data.id}`}>
                    <span className="username-capitalize">
                      {post.attributes.user.data.attributes.username}
                    </span>
                  </Link>
                </Card.Title>
                <Card.Text>
                  <div>
                    {post.attributes.text}
                  </div>
                </Card.Text>
                <div className="d-flex align-items-center">
                  {userHasLiked ? (
                    <FontAwesomeIcon className='btn-like' onClick={() => handleLike(post.id, post.attributes.like)} icon={faThumbsUp} style={{ color: "#e74c32" }} />
                  ) : (
                    <FontAwesomeIcon className='btn-like' onClick={() => handleLike(post.id, post.attributes.like)} icon={faThumbsUp} style={{ color: "#f6f6f6" }} />
                  )}
                  <span className="ml-2">{post.attributes.like}</span>
                  {post.attributes.user.data.attributes.username === loginState.username ? (
                    <FontAwesomeIcon className='btn-delete' icon={faTrash} style={{ color: "#e74c32" }} onClick={() => handleDelete(post.id)} />
                  ) : (
                    ''
                  )}
                </div>
              </Card.Body>
            </Card>
          )
        })}
      </>
    </div>
  )
}

export default PostsList;
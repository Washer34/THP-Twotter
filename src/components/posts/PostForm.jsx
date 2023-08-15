import { useState } from 'react';
import { useAtom } from 'jotai';
import { loginAtom } from '../auth/loginAtom';

const PostForm = ({ reloadPostsList }) => {
  const [loginState] = useAtom(loginAtom);

  const [postContent, setPostContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const objectData = {
      "data": {
        "user": loginState.userId,
        "text": postContent,
      }
    }

    try {
      const response = await fetch('http://localhost:1337/api/posts', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginState.token}`,
        },
        body: JSON.stringify(objectData)
      });
      if (response.ok) {
        console.log('Post envoyé')
        reloadPostsList();
      } else {
        throw new Error('Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la requête: ', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          className="form-control"
          id="post"
          value={postContent}
          placeholder='Quoi de neuf ?!'
          onChange={(e) => setPostContent(e.target.value)} />
        <button type="submit" className="btn btn-primary">
          Poster
        </button>
      </form>
    </div>
  )
}
export default PostForm;
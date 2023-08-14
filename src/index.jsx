import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Accueil from './pages/Accueil'
import Navbar from './components/Navbar'
import Register from './pages/Register';
import Login from './pages/Login';
import Author from './pages/Author';
import { useAtom } from 'jotai';
import { loginAtom } from './components/auth/loginAtom';
import Cookies from 'js-cookie';

const App = () => {
  const [loginState, setLoginState] = useAtom(loginAtom);

  useEffect(() => {
    const userInfoCookie = Cookies.get('userInfo')
    if (userInfoCookie) {
      const userInfo = JSON.parse(userInfoCookie)
      setLoginState({
        isLoggedIn: true,
        token: userInfo.token,
        userId: userInfo.userId,
        username: userInfo.username
      });
    }
  }, []);

  return (
    <Router>
      <div id='app'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/profil/:userid" element={<Author />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

export default App;
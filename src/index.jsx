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
import './style.css'

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
      <div id='app' className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-2">
            <Navbar />
          </div>
          <div className="col-md-7">
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/profil/:userid" element={<Author />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

export default App;
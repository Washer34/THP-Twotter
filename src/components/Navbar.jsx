import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAtom } from 'jotai';
import { loginAtom } from './auth/loginAtom';
import LogoutButton from './auth/LogoutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons';

const NavbarComp = () => {
  const [loginState] = useAtom(loginAtom);

  return (
    <Navbar expand="lg" className="vertical-navbar">
      <div className="d-flex flex-column align-items-center" style={{ maxHeight: '100%' }}>
        <Link to="/"><img src="src/images/twotter-icon-128.png" className='twotter-logo' /></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <Link className="nav-link" to="/"><FontAwesomeIcon icon={faHouse} /> Accueil</Link>
            {loginState.isLoggedIn ? (
              <>
                <Link className="nav-link" to={`/profil/${loginState.userId}`}><FontAwesomeIcon icon={faUser} /> Profil</Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">Se connecter</Link>
                <Link className="nav-link" to="/register">S'inscrire</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
      {loginState.isLoggedIn && (
        <div className="mt-auto">
          <LogoutButton />
        </div>
      )}
    </Navbar>
  );
}



export default NavbarComp;
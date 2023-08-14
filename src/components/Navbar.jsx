import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAtom } from 'jotai';
import { loginAtom } from './auth/loginAtom';
import LogoutButton from './auth/LogoutButton';

const NavbarComp = () => {
  const [loginState] = useAtom(loginAtom);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link className="navbar-brand" to="/">Twotter</Link>
        <Link className="navbar-brand" to="/">Accueil</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {loginState.isLoggedIn ? (
              <>
                <Link className="nav-link" to={`/profil/${loginState.userId}`}>Profil</Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">Se connecter</Link>
                <Link className="nav-link" to="/register">S'inscrire</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
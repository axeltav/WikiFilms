import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { Search } from "./Search";

export const Navbar = () => {

  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();

  let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleInscription = () => {
    navigate('/inscription');
  }

  const handleConnexion = () => {
    navigate('/connexion');
  }

  const handleLogOut = () => {
    localStorage.removeItem("currentUser");
    navigate('/');
  };

  const handleUserAvatarClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" href="#"><h1 className="siteName">Wikifilms</h1></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Accueil<span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/films">Film</Link>
      </li>
      {currentUser && <li className="nav-item">
        <Link className="nav-link" to="/favoris">Favoris</Link>
      </li>}
    </ul>
  </div>
  <div className="d-none d-md-block">
    <Search/>
  </div>
    {currentUser && currentUser.userName ?
    <div className="dd">
      <Avatar
      className="ml-2 user-avatar"
      onClick={handleUserAvatarClick}
      name={currentUser.userName}
      size="40"
      round={true}
      /> 
      {showUserMenu && 
        <div className="dd-content">
          <div className="userMenuItem" onClick={handleLogOut}>
            <p className="m-0">Déconnexion</p>
          </div>
        </div>
      }
    </div>
    : 
    <div>
      <button className="btn p-1 m-1" onClick={handleInscription}>Inscription</button>
      <button className="btn p-1 m-1" onClick={handleConnexion}>Connexion</button>
    </div>}
    
</nav>
    </>
  );
}

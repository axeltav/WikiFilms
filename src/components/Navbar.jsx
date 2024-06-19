import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";

export const Navbar = () => {

  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(window.location.pathname === "/films/recherche"){
      console.log('meme page')
    }
    navigate({
      pathname: '/films/recherche',
      search: `?search=${search}`
    });
    navigate(0);
  }

  const handleInscription = () => {
    navigate('/inscription');
  }

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
        <Link className="nav-link" href="/">Accueil<span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/">Film</Link>
      </li>
    </ul>
  </div>
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Chercher" value={search} onChange={handleChange}/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Chercher</button>
    </form>
    {currentUser && currentUser.userName ?
    <Avatar
    className="ml-2"
    name={currentUser.userName}
    size="40"
    round={true}
    /> : 
    <div>
      <button className="btn p-1 m-1" onClick={handleInscription}>Inscription</button>
      <button className="btn p-1 m-1">Connexion</button>
    </div>}
    
</nav>
    </>
  );
}

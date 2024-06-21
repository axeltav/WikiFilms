import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Search = () => {

    const [search, setSearch] = useState('');

    const navigate = useNavigate();

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

  return (
    <>
      <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
        <input className="form-control mr-sm-2" type="search" placeholder="Chercher" aria-label="Chercher" value={search} onChange={handleChange}/>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Chercher</button>
    </form>
    </>
  );
}
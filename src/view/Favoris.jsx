import { MovieList } from "../components/MovieList";

/* eslint-disable react/no-unescaped-entities */
export const Favoris = () => {

    let favoritesList = JSON.parse(localStorage.getItem('favoritesList'));
  return (
    <div className="container mt-5">
      {favoritesList ? <MovieList movies={favoritesList} isfavoritesList={true}/> : <p>Vous n'avez aucun favori !</p> }
    </div>
  );
}
/* eslint-disable react/no-unescaped-entities */
import { MovieList } from "../components/MovieList";

export const Favoris = () => {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let favoritesList = JSON.parse(localStorage.getItem('favoritesList'));
    favoritesList = favoritesList.filter(favorite => favorite.user === user.email)

  return (
    <div className="container mt-5">
      {favoritesList ? <MovieList movies={favoritesList} isfavoritesList={true}/> : <p>Vous n'avez aucun favori !</p> }
    </div>
  );
}
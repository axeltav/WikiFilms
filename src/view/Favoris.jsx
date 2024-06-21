/* eslint-disable react/no-unescaped-entities */
import { MovieList } from "../components/MovieList";

export const Favoris = () => {
  let user = JSON.parse(localStorage.getItem('currentUser'));
  let favoritesList = JSON.parse(localStorage.getItem('favoritesList'));
  if (favoritesList) {
    favoritesList = favoritesList.filter(favorite => favorite.user === user.email)
  }
  return (
    <div className="container mt-5">
      {favoritesList && favoritesList.length > 0 ? <MovieList movies={favoritesList} isfavoritesList={true} /> : <p className="h5 white">Vous n'avez aucun favori !</p>}
    </div>
  );
}
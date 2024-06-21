/* eslint-disable react/prop-types */
import { MovieCard } from "./MovieCard";

export const MovieList = ({movies = [], isfavoritesList = false}) => {

  return (
    <>
        <div className="row d-flex justify-content-around m-0" style={{width: "100%"}}>
            {movies.map(movie => {
                return (
                    <MovieCard key={movie.id} movie={movie} isfavoritesList={isfavoritesList}/>
                );
            })}
        </div>
    </>
  );
}
/* eslint-disable react/prop-types */
import { MovieCard } from "./MovieCard";

export const MovieList = ({movies = []}) => {

    

  return (
    <>
        <div className="row" style={{width: "100%"}}>
            {movies.map(movie => {
                return (
                    <MovieCard key={movie.id} movie={movie}/>
                );
            })}
        </div>
    </>
  );
}
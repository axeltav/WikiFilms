/* eslint-disable react/prop-types */
import { MovieCard } from "./MovieCard";

export const MovieList = ({movies = []}) => {

    

  return (
    <>
        <div className="row d-flex justify-content-center" style={{width: "100%"}}>
            {movies.map(movie => {
                return (
                    <MovieCard key={movie.id} movie={movie}/>
                );
            })}
        </div>
    </>
  );
}
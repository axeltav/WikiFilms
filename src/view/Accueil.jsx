import { useEffect, useState } from "react";
import { useAxiosOpti } from "../hooks/useAxiosOpti";
import InfiniteScroll from "react-infinite-scroll-component";
import { MovieList } from "../components/MovieList";

export const Accueil = () => {

    const [movies, setMovies] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const {get} = useAxiosOpti();

    useEffect(() => {
        console.log('requete en cours');
        
        get(`discover/movie?page=${page}&api_key=de399415d2204316dcf46dabb3632ce6`)
            .then(res => {
              setPage(currentVal => currentVal + 1);
              setMovies(res.data.results);
            }) 
    },[]);

    const fetchMoreMovies = () => {
      get(`discover/movie?page=${page}&api_key=de399415d2204316dcf46dabb3632ce6`)
            .then(res => {
              setPage(currentVal => currentVal + 1);
              setMovies(currentVal => currentVal.concat(res.data.results));
              res.data.results.length >= 20 ? setHasMore(true) : setHasMore(false);
            })
    }

    

  return (
    <>
      <h1>Liste des films</h1>
      <InfiniteScroll
        className=""
        dataLength={movies.length}
        next={fetchMoreMovies}
        hasMore={hasMore}
        loader={<p style={{color: "white"}}>Chargement de nouveaux films ...</p>}>
      <div className="container">
        <div className="row" style={{display:"flex", flexWrap: "wrap"}}>
          <div className="col-3">
            {/* filtres ici */}
          </div>
          <div className="col-9 px-0">
            <MovieList movies={movies}/>
          </div>
        </div>
      </div>
      </InfiniteScroll>

    </>
  );
}

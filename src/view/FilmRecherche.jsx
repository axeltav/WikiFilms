import { useEffect, useState } from "react";
import { useAxiosOpti } from "../hooks/useAxiosOpti";
import { MovieList } from "../components/MovieList";
import InfiniteScroll from "react-infinite-scroll-component";

export const FilmRecherche = () => {

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const {get} = useAxiosOpti();

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const search = urlParams.get('search');

    useEffect(() => {
        get(`search/movie?page=${page}&query=${search}&language=fr&api_key=de399415d2204316dcf46dabb3632ce6`)
            .then(res => {
              setPage(2);
              setMovies(res.data.results);
            }) 
    },[]);

    const fetchMoreMovies = () => {

        get(`search/movie?page=${page}&query=${search}&language=fr&api_key=de399415d2204316dcf46dabb3632ce6`)
              .then(res => {
                setPage(currentVal => currentVal + 1);
                setMovies(currentVal => currentVal.concat(res.data.results));
                res.data.results.length >= 20 ? setHasMore(true) : setHasMore(false);
              })
      }

  return (
    <>
    <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreMovies}
        hasMore={hasMore}
        loader={<p style={{color: "white"}}>Chargement de nouveaux films ...</p>}>
        <div className="container">
            <h1 className="py-3">{search}</h1>
            <MovieList movies={movies}/>
        </div>
    </InfiniteScroll>
    </>
  );
}
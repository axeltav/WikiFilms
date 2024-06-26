import { useEffect, useState } from "react";
import { useAxiosOpti } from "../hooks/useAxiosOpti";
import { MovieList } from "../components/MovieList";
import InfiniteScroll from "react-infinite-scroll-component";
import loader from "../assets/WikiFilms.gif";

export const FilmRecherche = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { get } = useAxiosOpti();

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const search = urlParams.get("search");

  useEffect(() => {
    get(
      `search/movie?page=${page}&query=${search}&language=fr&api_key=de399415d2204316dcf46dabb3632ce6`
    ).then((res) => {
      setPage(2);
      setMovies(res.data.results);
      setIsLoaded(true);
    });
  }, []);

  const fetchMoreMovies = () => {
    get(
      `search/movie?page=${page}&query=${search}&language=fr&api_key=de399415d2204316dcf46dabb3632ce6`
    ).then((res) => {
      setPage((currentVal) => currentVal + 1);
      setMovies((currentVal) => currentVal.concat(res.data.results));
      res.data.results.length >= 20 ? setHasMore(true) : setHasMore(false);
    });
  };

  return (
    <>
      {isLoaded ?(movies.length > 0 ? <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreMovies}
        hasMore={hasMore}
        loader={
          <p style={{ color: "white" }}>Chargement de nouveaux films ...</p>
        }
      >
        <div className="container">
          <h1 className="py-3">{search}</h1>
          <MovieList movies={movies} isfavoritesList={true} />
        </div>
      </InfiniteScroll> : <p className="h3 white text-center mt-5">Aucun film trouvé !</p>)
      :
        <div className="d-flex justify-content-center align-items-center loader-container">
          <img src={loader} alt="image de chargement"/>
        </div>
      }
    </>
  );
};

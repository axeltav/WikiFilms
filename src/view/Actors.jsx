import { useEffect, useState } from "react";
import { useAxiosOpti } from "../hooks/useAxiosOpti";
import { ActorList } from "../components/ActorList";
import InfiniteScroll from "react-infinite-scroll-component";
import loader from "../assets/WikiFilms.gif";
import { Search } from "../components/Search";

export const Actors = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [actors, setActors] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { get } = useAxiosOpti();

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const search = urlParams.get("query");

  const url = search? 'search/person' : 'person/popular';

  useEffect(() => {
    get(
      `${url}?page=${page}&query=${search}&language=fr&api_key=de399415d2204316dcf46dabb3632ce6`
    ).then((res) => {
      setPage(2);
      setActors(res.data.results);
      setIsLoaded(true);
    });
  }, []);

  const fetchMoreActors = () => {
    get(
      `${url}?page=${page}&query=${search}&language=fr&api_key=de399415d2204316dcf46dabb3632ce6`
    ).then((res) => {
      setPage((currentVal) => currentVal + 1);
      setActors((currentVal) => currentVal.concat(res.data.results));
      res.data.results.length >= 20 ? setHasMore(true) : setHasMore(false);
    });
  };

  return (
    <>
    <header className="header-actorList">
      <h2 className="header-items-actors mb-3">Liste des acteurs</h2>
      <Search actor={true}/>
    </header>
          {isLoaded ?(actors.length > 0 ?<InfiniteScroll
        dataLength={actors.length}
        next={fetchMoreActors}
        hasMore={hasMore}
        loader={
          <p style={{ color: "white" }}>Chargement de nouveaux acteurs ...</p>
        }
      >
        <div className="container">
          <h1 className="py-3">{search}</h1>
          <ActorList actors={actors} isfavoritesList={true} />
        </div>
      </InfiniteScroll> : <p className="h3 white text-center mt-5">Aucun acteur trouvé !</p>)
      :
        <div className="d-flex justify-content-center align-items-center loader-container">
          <img src={loader} alt="image de chargement"/>
        </div>
      }
    </>
  );
};

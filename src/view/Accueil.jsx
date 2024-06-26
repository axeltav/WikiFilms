import { useEffect, useState } from "react";
import { Slider } from "../components/Slider";
import { useAxiosOpti } from "../hooks/useAxiosOpti";
import loader from "../assets/WikiFilms.gif"


export const Accueil = () => {
  const { get } = useAxiosOpti();

  const [isLoaded, setIsLoaded] = useState(false);

  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    Promise.all([
      get(
        `movie/now_playing?&language=fr&api_key=de399415d2204316dcf46dabb3632ce6`
      ).then((res) => {
        setNowPlaying(res.data.results);
      }),
      get(
        `movie/popular?&language=fr&api_key=de399415d2204316dcf46dabb3632ce6`
      ).then((res) => {
        setPopular(res.data.results);
      }),
      get(
        `movie/top_rated?&language=fr&api_key=de399415d2204316dcf46dabb3632ce6`
      ).then((res) => {
        setTopRated(res.data.results);
      }),
      get(
        `movie/upcoming?&language=fr&api_key=de399415d2204316dcf46dabb3632ce6`
      ).then((res) => {
        setUpcoming(res.data.results);
      }),
    ]).then(() => {
      setIsLoaded(true);
    });
  }, []);

  return (
    <div>
        <div className="jumbotron jumbotron-fluid jumbotron-homepage">
          <div className="container">
            <h1 className="display-4">WikiFilms</h1>
            <p className="lead">Retrouvez tous vos films et séries</p>
          </div>
        </div>
        {isLoaded ? 
          <>
            <section className="homeSlider m-auto">
              <Slider movieList={nowPlaying} title="Du moment" />
            </section>
            <section className="homeSlider m-auto">
              <Slider movieList={popular} title="Populaire" />
            </section>
            <section className="homeSlider m-auto">
              <Slider movieList={upcoming} title="Á venir" />
            </section>
            <section className="homeSlider m-auto">
              <Slider movieList={topRated} title="Mieux noté" />
            </section>
          </>
          :
          <div className="d-flex justify-content-center align-items-center loader-container">
            <img src={loader} alt="image de chargement"/>
          </div>
        }
    </div>
  );
};

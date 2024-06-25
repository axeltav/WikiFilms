/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useAxiosOpti } from "../hooks/useAxiosOpti";
import { AddFavoritesButton } from "../components/AddFavoritesButton";
import { Comments } from "../components/Comments";
import loader from "../assets/WikiFilms.gif"

export const FilmDetail = () => {

  const user = JSON.parse(localStorage.getItem('currentUser'));
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf('/') + 1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movie, setMovie] = useState({});
  const [videos, setVideos] = useState({});
  const [credits, setCredits] = useState([]);
  const { get } = useAxiosOpti();
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    console.log('requete en cours');
    Promise.all([
      get(`movie/${id}?language=fr&api_key=de399415d2204316dcf46dabb3632ce6`)
        .then(res => {
          console.log(res);
          setMovie(res.data)
        }),

      get(`movie/${id}/videos?language=fr&api_key=de399415d2204316dcf46dabb3632ce6`)
        .then(res => {
          setVideos(res.data.results)
        }),

      get(`movie/${id}/credits?language=fr&api_key=de399415d2204316dcf46dabb3632ce6`)
        .then(res => {
          setCredits(res.data)

        })
    ]).then(() => {
      setIsLoaded(true);
      document.getElementById("trailerModal").modal("hide.bs.modal", () => {
        pause();
        console.log("pause");
      })
    })
  }, []);


  const pause = () => {
    const iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    iframe.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
  }

  const handleOpenModal = () => {
    setIsOpen(true);
  }
  const handleCloseModal = (e) => {
    e.stopPropagation();
    pause();
    setIsOpen(false);
  }

  return (
    <>
    { isLoaded ?
      <>
        <div className="jumbotron" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url(https://media.themoviedb.org/t/p/w1920_and_h1080_bestv2/${movie.backdrop_path})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
          <div className="container" style={{ color: 'white' }}>
            <div className="row justify-content">
              <div className="fit-content col-12 col-lg-4">
                <img className="img_film" src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}></img>
              </div>
              <div className="col-12 col-lg-8">
                <h2 className="display-4">{movie.title} ({movie.release_date && movie.release_date.slice(0, 4)})</h2>
                <p className="lead"><p className="h5">Genres :</p> {movie.genres && movie.genres.map(genre => {
                  return ` ${genre.name}`
                })}</p>
                <div className="d-flex flex-row">
                  {videos[0] && <button type="button" onClick={handleOpenModal} className="btn btn-trailer mr-2" data-toggle="modal" data-target="#trailerModal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" fill="currentColor" className="bi bi-play-btn" viewBox="0 0 16 16">
                    <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                  </svg>Bande-annonce</button>}

                  <AddFavoritesButton movie={movie}/>
                </div>
                <p><p className="h5">Synopsis :</p> {movie.overview} </p>
                <p><p className="h5">Réalisateur :</p> {credits.crew && credits.crew.find(person => person.job.search(/^Director$/) !== -1).name} </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container filmdetail-info ">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex flex-row justify-content-around flex-wrap mb-3">
              {credits.cast && credits.cast.slice(0, 6).map(actor => {
                return (

                  <div className="card ml-1" key={actor.name} style={{ width: "13rem" }}>
                    <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${actor.profile_path}`} className="card-img-top" alt={`portrait de ${actor.name}`} />
                    <div className="card-body">
                      <p className="card-title h5 white">{actor.name}</p>
                      <p className="card-text">{actor.character}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="comment-section col-6">
              <Comments movieId={movie.id}/>
            </div>
          </div>
        </div>

        {isOpen && <div className="modal fade" id="trailerModal" tabIndex="-1" role="dialog" aria-labelledby="trailerModalLabel" onClick={handleCloseModal} aria-hidden="true">
          <div className="modal-dialog" onClick={(e) => { e.stopPropagation() }} role="document">
            <div className="modal-content">
              <div className="modal-header">
                <p className="modal-title h5 white" id="trailerModalLabel">{movie.title}</p>
                <button type="button" onClick={handleCloseModal} className="close white" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body p-0">
                <iframe allowscriptaccess="always" className="iframe" allowFullScreen="" src={videos[0] ? `https://www.youtube.com/embed/${videos[0].key}?rel=0&enablejsapi=1` : ""}></iframe>
              </div>
            </div>
          </div>
        </div>}
      </>
      :
      <div className="d-flex justify-content-center align-items-center loader-container">
        <img src={loader} alt="image de chargement"/>
      </div>
    }
    </>
  );
}
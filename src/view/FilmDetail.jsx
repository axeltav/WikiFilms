/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useAxiosOpti } from "../hooks/useAxiosOpti";
import { Slider } from "../components/Slider";
import { AddFavoritesButton } from "../components/AddFavoritesButton";
import { Comments } from "../components/Comments";
import loader from "../assets/WikiFilms.gif";
import { useNavigate } from "react-router-dom";

export const FilmDetail = () => {

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf('/') + 1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movie, setMovie] = useState({});
  const [videos, setVideos] = useState({});
  const [credits, setCredits] = useState([]);
  const [recom, setRecom] = useState([]);
  const { get } = useAxiosOpti();
  const [isOpen, setIsOpen] = useState(false);
  const [showListActor, setShowListActor] = useState(false);
  const [showListCrew, setShowListCrew] = useState(false);

  const navigate = useNavigate();

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

          }),
        get(`movie/${id}/recommendations?language=fr&api_key=de399415d2204316dcf46dabb3632ce6`)
          .then(res => {
            setRecom(res.data.results)
            console.log(res.data.results);
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

  const handleActorClick = (id) => {
    navigate(`/acteurs/${id}`);
  }
  
  const handleToogleListActor = () => {
    setShowListActor(!showListActor);
  }

  const handleToogleListCrew = () => {
    setShowListCrew(!showListCrew);
  }
  
  return (
    <>
      {isLoaded ?
        <>
          <div className="jumbotron" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url(https://media.themoviedb.org/t/p/w1920_and_h1080_bestv2/${movie.backdrop_path})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <div className="container" style={{ color: 'white' }}>
              <div className="row justify-content">
                <div className="fit-content col-12 col-lg-4">
                  <img className="img_film" src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}></img>
                </div>
                <div className="col-12 col-lg-8">
                  <h2 className="display-4">{movie.title} ({movie.release_date && movie.release_date.slice(0, 4)})</h2>
                  <p className="lead"><p className="h5">Genres :</p> {movie.genres && movie.genres.length > 0 ? movie.genres.map(genre => {
                    return ` ${genre.name}`
                  }) : "Non renseigné"}</p>
                  <div className="d-flex flex-row">
                    {videos[0] && <button type="button" onClick={handleOpenModal} className="btn btn-trailer mr-2" data-toggle="modal" data-target="#trailerModal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" fill="currentColor" className="bi bi-play-btn" viewBox="0 0 16 16">
                      <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                    </svg>Bande-annonce</button>}

                    <AddFavoritesButton movie={movie} />
                  </div>
                  <p><p className="h5">Synopsis :</p> {movie.overview ? movie.overview : "Non renseigné"} </p>
                  {credits.crew && credits.crew.find(person => person.job.search(/^Director$/) !== -1) && <p><p className="h5">Réalisateur :</p> {credits.crew.find(person => person.job.search(/^Director$/) !== -1).name} </p>}
                </div>
              </div>
            </div>
          </div>
          <div className="infosSupp">
            <p><p className="h5 white">Titre d'origine : </p> {movie.original_title}</p>
            <p><p className="h5 white">Durée : </p> {movie.runtime && movie.runtime > 0 ? movie.runtime + " minutes" : "Non renseigné"}</p>
            <p><p className="h5 white">Date de sortie : </p> {movie.release_date ? movie.release_date : "Non renseigné"}</p>
            <p><p className="h5 white">Budget : </p> {movie.budget && movie.budget > 0 ? movie.budget + " $" : "Non renseigné"}</p>
            <p><p className="h5 white">Recette : </p> {movie.revenue && movie.revenue > 0 ? movie.revenue + " $" : "Non renseigné"}</p>
            <p><p className="h5 white">Statut : </p> {movie.status ? movie.status : "Non renseigné"}</p>
          </div>
          <div className="container filmdetail-info ">
            <div className="row d-flex justify-content-center">
              <div className="col-12 d-flex flex-row justify-content-around flex-wrap mb-3">
                {credits.cast && credits.cast.slice(0, 6).map(actor => {
                  return (
                    <div className="card ml-1" key={actor.name} style={{ width: "13rem" }} onClick={()=>handleActorClick(actor.id)}>
                      <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${actor.profile_path}`} className="card-img-top" alt={`portrait de ${actor.name}`} />
                      <div className="card-body">
                        <p className="card-title h5 white">{actor.name}</p>
                        <p className="card-text">{actor.character}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="actorList m-2">
              <div className="d-flex flex-row justify-content-between align-items-center ">
                <h3 className="m-2">Acteurs</h3>
                <button className="actorListBtn m-2" onClick={handleToogleListActor}>
                {!showListActor ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                </svg> 
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                </svg>
                }
                </button>
              </div>
              {showListActor && <table className="table table-dark mb-0">
                <thead>
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Personnage</th>
                  </tr>
                </thead>
                <tbody>
                  {credits.cast.map(actor => {
                    return (
                      <tr key={actor.name}>
                        <td scope="row">{actor.name}</td>
                        <td>{actor.character}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>}
            </div>

            <div className="actorList m-2">
              <div className="d-flex flex-row justify-content-between align-items-center ">
                <h3 className="m-2">Équipe de prodution</h3>
                <button className="actorListBtn m-2" onClick={handleToogleListCrew  }>
                {!showListCrew ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                </svg> 
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                </svg>
                }
                </button>
              </div>
              {showListCrew && <table className="table table-dark mb-0">
                <thead>
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">poste</th>
                  </tr>
                </thead>
                <tbody>
                  {credits.crew.map(crew => {
                    return (
                      <tr key={crew.name}>
                        <td scope="row">{crew.name}</td>
                        <td>{crew.job}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>}
            </div>
            <div className="comment-section col-6 mb-5">
              <Comments movieId={movie.id}/>
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
          <img src={loader} alt="image de chargement" />
        </div>
      }
    </>
  );
}
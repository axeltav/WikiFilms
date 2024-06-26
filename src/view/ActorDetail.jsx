/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useAxiosOpti } from "../hooks/useAxiosOpti";
import { AddFavoritesButton } from "../components/AddFavoritesButton";
import loader from "../assets/WikiFilms.gif"
import { useNavigate } from "react-router-dom";

export const ActorDetail = () => {

  const user = JSON.parse(localStorage.getItem('currentUser'));
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf('/') + 1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [actor, setActor] = useState({});
  const [movieCredits, setMovieCredits] = useState({});
  const { get } = useAxiosOpti();
  const [showCreditsMovie, setShowCreditsMovie] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('requete en cours');
    Promise.all([
      get(`person/${id}?language=fr&api_key=de399415d2204316dcf46dabb3632ce6`)
        .then(res => {
          console.log(res);
          setActor(res.data)
        }),
      get(`person/${id}/movie_credits?language=fr&api_key=de399415d2204316dcf46dabb3632ce6`)
        .then(res => {
          console.log(res);
          setMovieCredits(res.data.cast)
        })
    ]).then(() => {
      setIsLoaded(true);
      document.getElementById("trailerModal").modal("hide.bs.modal", () => {
        pause();
        console.log("pause");
      })
    })
  }, []);

  const handleToogleCreditsMovie = () => {
    setShowCreditsMovie(!showCreditsMovie);
  }
  
  const handleMovieClick = (id) => {
    navigate(`/films/${id}`);
  }

  return (
    <>
      {isLoaded ?
        <>
          <div className="jumbotron" style={{ backgroundColor: "#393939" }}>
            <div className="container">
              <div className="row justify-content">
                <div className="fit-content col-12 col-lg-4">
                  <img className="img_actor" src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${actor.profile_path}`}></img>
                </div>
                <div className="col-12 col-lg-8">
                  <h2 className="display-4">{actor.name}</h2>
                  <p className="lead"><p className="h5">{actor.known_for_department}</p></p>
                  <p><p className="h5">Date de naissance :</p> {actor.birthday}</p>
                  <p><p className="h5">Lieu de naissance :</p> {actor.place_of_birth}</p>


                </div>
              </div>
            </div>
          </div>
          <div className="biography">
            <p><p className="h5">Biographie :</p> {actor.biography ? actor.biography : "Non renseigné"} </p>
          </div>
          <div className="movie-credits-container">
            <div className="movieCreditsList m-2">
              <div className="d-flex flex-row justify-content-between align-items-center ">
                <h3 className="m-2">Films</h3>
                <button className="actorListBtn m-2" onClick={handleToogleCreditsMovie}>
                  {!showCreditsMovie ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                  </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                  }
                </button>
              </div>
              {showCreditsMovie && <table className="table table-dark mb-0">
                <thead>
                  <tr>
                    <th scope="col">Titre</th>
                    <th scope="col">Personnage</th>
                    <th scope="col">Date de sortie</th>
                  </tr>
                </thead>
                <tbody>
                  {movieCredits.sort(compare).map(movie => {
                    return (
                      <tr style={{cursor:"pointer"}} key={movie.title} onClick={()=>handleMovieClick(movie.id)}>
                        <td scope="row">{movie.title}</td>
                        <td>{movie.character}</td>
                        <td>{movie.release_date}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>}
            </div>
          </div>
          {/* <div className="container filmdetail-info ">
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
          </div>
        </div> */}
        </>
        :
        <div className="d-flex justify-content-center align-items-center loader-container">
          <img src={loader} alt="image de chargement" />
        </div>
      }
    </>
  );
}

function compare(a, b) {
  if (a.release_date > b.release_date) {
    return -1;
  }
  if (a.release_date < b.release_date) {
    return 1;
  }
  return 0;
}
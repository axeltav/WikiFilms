/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import defaultActor from "../assets/Silhouette-homme.png"

export const ActorCard = ({ actor = {}, isfavoritesList = false }) => {

  let navigate = useNavigate();

  const routeChangeFilm = (id) => {
    let path = `acteurs/${id}`;

    if (isfavoritesList) {
      path = `../acteurs/${id}`;
    }
    navigate(path);
    navigate(0);
  }

  return (
    <>
      <div className="col-10 col-sm-5 col-md-4 col-lg-3 col-xl-2  d-flex justify-content-center pb-3 px-0 mx-1" >
        <div className="card poster" onClick={() => routeChangeFilm(actor.id)}>
          {actor.profile_path ?
            <img className="card-img-top" src={"https://image.tmdb.org/t/p/w200" + actor.profile_path} alt={`poster de ${actor.title}`} /> :
            <img className="card-img-top" src={defaultActor} alt={`poster de ${actor.title}`} />
          }
          <div className="card-body pt-2">
            <h5 className="card-title poster-title mb-1">{actor.name}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

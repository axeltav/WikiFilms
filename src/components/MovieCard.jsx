/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export const MovieCard = ({movie = {}}) => {

    let navigate = useNavigate(); 

    const routeChangeFilm = (id) =>{ 
      let path = `films/${id}`; 
      navigate(path);
    }

  return (
    <>
        <div  className="col-2 pb-3 mx-3" >
            <div className="card poster" onClick={() => routeChangeFilm(movie.id)}>
                <img className="card-img-top " src={"https://image.tmdb.org/t/p/w200"+ movie.poster_path} alt="Card image cap"/>
                <div className="card-body pt-2">
                <h5 className="card-title poster-title mb-1">{movie.title}</h5>
                <p className="card-text poster-date">{movie.release_date}</p>
                </div>
            </div>
        </div>
    </>
  );
}

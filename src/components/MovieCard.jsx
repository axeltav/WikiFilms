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
                <div className="overley-note d-flex justify-content-center align-items-center"
                  style={Math.round(movie.vote_average*10) >=70 ? {borderColor: "green"} : 
                  Math.round(movie.vote_average*10) >=40 ?{borderColor: "yellow"} : 
                  movie.vote_count > 0 ?{borderColor: "red"} : {}}>
                  <p className="overley-text mb-0">{movie.vote_count > 0 ? Math.round(movie.vote_average*10) : 'NR' }</p>
                </div>
                <div className="card-body pt-2">
                <h5 className="card-title poster-title mb-1">{movie.title}</h5>
                <p className="card-text poster-date">{movie.release_date}</p>
                </div>
            </div>
        </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { useAxiosOpti } from "../hooks/useAxiosOpti";

export const FilmDetail = () => {

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf('/') + 1);
  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState([]);
  const { get } = useAxiosOpti();

  useEffect(() => {
    console.log('requete en cours');

    get(`movie/${id}?language=fr&api_key=de399415d2204316dcf46dabb3632ce6`)
      .then(res => {
        console.log(res);
        setMovie(res.data)
      })

    get(`movie/${id}/credits?language=fr&api_key=de399415d2204316dcf46dabb3632ce6`)
      .then(res => {
        console.log(res);
        setCredits(res.data)
      })
      
  }, []);

  return (
    <>
      <div class="jumbotron" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url(https://media.themoviedb.org/t/p/w1920_and_h1080_bestv2/${movie.backdrop_path})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        <div class="container" style={{color: 'white'}}>
          <div class="row justify-content">
            <div class="fit-content">
            <img class="img_film" src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}></img>
            </div>
            <div class="col col6">
            <h2 class="display-4">{movie.title} ({movie.release_date})</h2>
             <p class="lead"><h5>Genres :</h5> {movie.genres && movie.genres.map(genre => {
              return ` ${genre.name}`  
            })}</p>
            {/*<p class="lead"> Genres : {movie.genres && movie.genres.join(", ")}</p>*/}
            <p><h5>Synopsis :</h5> {movie.overview} </p>
            <p><h5>Réalisateur :</h5> {credits.crew && credits.crew.find(person => person.job.search(/^Director$/) !== -1).name} </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import { useEffect, useState } from "react";
import { useAxiosOpti } from "../hooks/useAxiosOpti";
import InfiniteScroll from "react-infinite-scroll-component";
import { MovieList } from "../components/MovieList";
import RangeSlider from "../components/RangeSlider";

export const Accueil = () => {

    const [movies, setMovies] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const [genres, setGenres] = useState([]);
    const [genresApply, setgenresApply] = useState([]);
    const [genresChecked, setGenresChecked] = useState([]);

    const [startRealeaseDateApply, setStartRealeaseDateApply] = useState('');
    const [startRealeaseDateSelected, setStartRealeaseDateSelected] = useState('');
    const [endRealeaseDateApply, setEndRealeaseDateApply] = useState('');
    const [endRealeaseDateSelected, setEndRealeaseDateSelected] = useState('');

    const [toTimeApply, setToTimeApply] = useState(400);
    const [toTimeSelected, setToTimeSelected] = useState(400);
    const [fromTimeApply, setFromTimeApply] = useState(0);
    const [fromTimeSelected, setFromTimeSelected] = useState(0);
    
    const [toNoteApply, setToNoteApply] = useState(400);
    const [toNoteSelected, setToNoteSelected] = useState(400);
    const [fromNoteApply, setFromNoteApply] = useState(0);
    const [fromNoteSelected, setFromNoteSelected] = useState(0);

    const [sort, setSort] = useState('');

    const {get} = useAxiosOpti();

    useEffect(() => {

      let params = '';

      if(toTimeApply && toTimeApply < 400){
        params = params + `&with_runtime.lte=${toTimeApply}`;
      }

      if(fromTimeApply){
        params = params + `&with_runtime.gte=${fromTimeApply}`;
      }

        get(`discover/movie?page=${page}&language=fr&api_key=de399415d2204316dcf46dabb3632ce6` + params)
            .then(res => {
              setPage(2);
              setMovies(res.data.results);
            }) 

        get(`genre/movie/list?language=fr&api_key=de399415d2204316dcf46dabb3632ce6`)
            .then(res => {
              setGenres(res.data.genres);
            }) 
    },[]);

    const fetchMoreMovies = () => {

      let params = '';

      if (genresApply.length > 0) {
        params = `&with_genres=${genresApply.join('%7C%7C')}`;
      }

      if(startRealeaseDateApply){
        const date = new Date(startRealeaseDateApply);
        params = params + `&primary_release_date.gte=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
      
      if(endRealeaseDateApply){
        const date = new Date(endRealeaseDateApply);
        params = params + `&primary_release_date.lte=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }

      if(toTimeApply && toTimeApply < 400){
        params = params + `&with_runtime.lte=${toTimeApply}`;
      }

      if(fromTimeApply){
        params = params + `&with_runtime.gte=${fromTimeApply}`;
      }

      if(toNoteApply) {
        params = params + `&vote_average.lte=${toNoteSelected}`;
      }

      if(fromNoteApply) {
        params = params + `&vote_average.gte=${fromNoteSelected}`;
      }

      if(sort.length > 0) {
        params = params + `&sort_by=${sort}`;
      }

      if(sort === "vote_average.asc" || sort === "vote_average.desc") {
        params = params + "&vote_count.gte=500"
      }

      get(`discover/movie?page=${page}&language=fr&api_key=de399415d2204316dcf46dabb3632ce6` + params)
            .then(res => {
              setPage(currentVal => currentVal + 1);
              setMovies(currentVal => currentVal.concat(res.data.results));
              res.data.results.length >= 20 ? setHasMore(true) : setHasMore(false);
            })
    }

    const changeGenresSelected = (e) => {
      if (e.target.checked) {
        setGenresChecked([...genresChecked, e.target.id]);
      } else {
        setGenresChecked(genresChecked.filter(genre => genre!== e.target.id));
      }
    }

    const changeStartRealeaseDateSelected = (e) => {
      setStartRealeaseDateSelected(e.target.value);
    }

    const changeEndRealeaseDateSelected = (e) => {
      setEndRealeaseDateSelected(e.target.value);
    }

    const validFilters = (e) => {
      e.preventDefault();

      let params = '';

      if (genresChecked.length > 0) {
        params = `&with_genres=${genresChecked.join('%7C%7C')}`;
      }

      if(startRealeaseDateSelected){
        const date = new Date(startRealeaseDateSelected);
        params = params + `&primary_release_date.gte=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
      
      if(endRealeaseDateSelected){
        const date = new Date(endRealeaseDateSelected);
        params = params + `&primary_release_date.lte=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }

      if(toTimeSelected && toTimeSelected < 400) {
        params = params + `&with_runtime.lte=${toTimeSelected}`;
      }

      if(fromTimeSelected) {
        params = params + `&with_runtime.gte=${fromTimeSelected}`;
      }

      if(toNoteSelected) {
        params = params + `&vote_average.lte=${toNoteSelected}`;
      }

      if(fromNoteSelected) {
        params = params + `&vote_average.gte=${fromNoteSelected}`;
      }

      if(sort.length > 0) {
        params = params + `&sort_by=${sort}`;
      }

      setgenresApply(genresChecked);

      setStartRealeaseDateApply(startRealeaseDateSelected);
      setEndRealeaseDateApply(endRealeaseDateSelected);

      setToTimeApply(toTimeSelected);
      setFromTimeApply(fromTimeSelected);
      
      setToNoteApply(toNoteSelected);
      setFromNoteApply(fromNoteSelected);

      get(`discover/movie?page=1&language=fr&api_key=de399415d2204316dcf46dabb3632ce6` + params)
            .then(res => {
              setPage(2);
              setMovies(res.data.results);
              res.data.results.length >= 20 ? setHasMore(true) : setHasMore(false);
            })
    }

    const handleSortChange = (e) => {
      
      let params = '';

      if (genresApply.length > 0) {
        params = `&with_genres=${genresApply.join('%7C%7C')}`;
      }

      if(startRealeaseDateApply){
        const date = new Date(startRealeaseDateApply);
        params = params + `&primary_release_date.gte=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
      
      if(endRealeaseDateApply){
        const date = new Date(endRealeaseDateApply);
        params = params + `&primary_release_date.lte=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }

      if(toTimeApply && toTimeApply < 400){
        params = params + `&with_runtime.lte=${toTimeApply}`;
      }

      if(fromTimeApply){
        params = params + `&with_runtime.gte=${fromTimeApply}`;
      }

      if(toNoteApply) {
        params = params + `&vote_average.lte=${toNoteSelected}`;
      }

      if(fromNoteApply) {
        params = params + `&vote_average.gte=${fromNoteSelected}`;
      }

      setSort(e.target.value);

      params = params + `&sort_by=${e.target.value}`;

      if(e.target.value === "vote_average.asc" ||e.target.value === "vote_average.desc") {
        params = params + "&vote_count.gte=500"
      }

      get(`discover/movie?page=1&language=fr&api_key=de399415d2204316dcf46dabb3632ce6` + params)
            .then(res => {
              setPage(2);
              setMovies(res.data.results);
              res.data.results.length >= 20 ? setHasMore(true) : setHasMore(false);
            })
    }
    
    

  return (
    <>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreMovies}
        hasMore={hasMore}
        loader={<p style={{color: "white"}}>Chargement de nouveaux films ...</p>}>
      <div className="container">
        <div className="row" style={{display:"flex", flexWrap: "wrap"}}>
          <aside className="col-3 d-flex flex-column align-items-center pt-5 filters">
            <h2>Liste des films</h2>
            {/* filtres ici */}
            <p>Filtres</p>

            <form action="" onSubmit={validFilters} className="formFilter">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Séléctionez les genres
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {genres.map(genre => {
                    return (
                      <div key={genre.id} className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id={genre.id} onChange={changeGenresSelected}/>
                        <label className="form-check-label" htmlFor={genre.id} >
                          {genre.name}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="form-group pt-3">
                <p>Dates de sorties :</p>
                <div className="d-flex justify-content-between pb-3">
                  <label htmlFor="startRealeaseDate" className="white">Du</label>
                  <input type="date" className="form-control dateInput" id="startRealeaseDate" onChange={changeStartRealeaseDateSelected}/>
                </div>
                <div className="d-flex justify-content-between">
                  <label htmlFor="endRealeaseDate" className="white">Au</label>
                  <input type="date" className="form-control dateInput" id="endRealeaseDate" onChange={changeEndRealeaseDateSelected}/>
                </div>
              </div>
              <div>
                <p>Durée du film :</p>
                <RangeSlider updateTo={setToTimeSelected} updateFrom={setFromTimeSelected} max={400} name="runTime"/>

                <p>évaluation des utilisateurs :</p>
                <RangeSlider updateTo={setToNoteSelected} updateFrom={setFromNoteSelected} max={10} name="note"/>
              </div>
              <div className="validation">
                <button type="submit" className="btn validBtn">Valider</button>
              </div>
            </form>
          </aside>
          <section className="col-9 pt-5 px-0">
            <div className="sort pb-3 row">
              <div className="col-9"></div>
              <select onChange={handleSortChange} defaultValue="" style={{width: "16rem"}} className="form-control form-control-sm col-2">
                <option value="">Trier les résultats par</option>
                <optgroup label="popularité">
                  <option value="popularity.desc">décroissant</option>
                  <option value="popularity.asc">croissant</option>
                </optgroup>
                <optgroup label="Évaluation">
                  <option value="vote_average.desc">décroissant</option>
                  <option value="vote_average.asc">croissant</option>
                </optgroup>
                <optgroup label="Date de sortie">
                  <option value="primary_release_date.desc">décroissant</option>
                  <option value="primary_release_date.asc">croissant</option>
                </optgroup>
                <option value="title.asc">Ordre alphabétique</option>
              </select>
            </div>
          
            <MovieList movies={movies}/>
          </section>
        </div>
      </div>
      </InfiniteScroll>

    </>
  );
}
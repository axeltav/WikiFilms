/* eslint-disable react/prop-types */
import RangeSlider from "./RangeSlider";

export const ModalFilter = (
    {validFilters, 
        genres = [], 
        changeGenresSelected, 
        changeStartRealeaseDateSelected,
        changeEndRealeaseDateSelected, 
        setToTimeSelected, 
        setFromTimeSelected, 
        setToNoteSelected, 
        setFromNoteSelected
    }) => {



  return (
    <form action="" onSubmit={validFilters} className="formFilter modalFilter modal fade m-auto" id="filterModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Filtres</h5>
            <button type="button" className="close white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle select-responsive" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" className="btn validBtn">Save changes</button>
          </div>
        </div>
      </div>
    </form>
  );
}
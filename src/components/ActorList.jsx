/* eslint-disable react/prop-types */
import { ActorCard } from "./ActorCard";

export const ActorList = ({actors = [], isfavoritesList = false}) => {

  return (
    <>
        <div className="row d-flex justify-content-around m-0" style={{width: "100%"}}>
            {actors.map(actor => {
                return (
                    <ActorCard key={actor.id} actor={actor} isfavoritesList={isfavoritesList}/>
                );
            })}
        </div>
    </>
  );
}
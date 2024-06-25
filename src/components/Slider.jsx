import React from 'react'
import { MovieCard } from './MovieCard'

export function Slider({ title, movieList = [] }) {
    console.log(movieList);
    return (
        <section className='sliderSection'>
            <h3>Recommandations</h3>
            <div className='customSlider mt-3'>{movieList && movieList.map(movie => {
                return (<MovieCard key={movie.id} movie={movie} />)
            })}
            </div>
        </section>
    )
}

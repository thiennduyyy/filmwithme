import React from 'react'
import '../Rows/Row.scss'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { GenresContext } from '../GenresContext';

const base_url = "https://image.tmdb.org/t/p/w500/";

function MovieCard({movie}) {
    const genres = useContext(GenresContext)
    const navigate = useNavigate()
    const handleNavigate = (id) => {
        navigate(`/movie/${id}`)
    };
    const scoreColor = (x) => {
        if (x>=7) {
            return '#179617'
        } else if (x>=5 && x<7) {
            return '#ffc107'
        } else {
            return '#f00'
        }
    }

  return (
    <div className="row__movie">
        <img
            draggable="false"
            key={movie.id}
            onClick={() => handleNavigate(movie.id)}
            className={`row__poster`}
            // src={`${base_url}${`${base_url}${( movie.poster_path && movie.backdrop_path)?(isLargeRow ? movie.poster_path : movie.backdrop_path):'mv4lRdLy201m3pndE68MuIKofpt.jpg'}`}`}
            src={`${base_url}${movie?.poster_path}`}
            alt={movie.name}
        />
        <div style={{padding: '0 10px'}}>
            <div>
            <h4 
                style={{'marginTop': '10px', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden'}}
                onClick={() => handleNavigate(movie.id)}
            >{movie.original_title}</h4>
            </div>
            <div style={{'marginTop': '5px', display: 'flex'}}>
            {/* <FaImdb style={{color: 'yellow', fontSize: '2rem'}} /> */}
            <img alt="imdb" src='/imdb.png' style={{width: '2.5rem', height: 'auto'}}/>
            <p style={{margin: 'auto 0 auto 0.5rem', fontWeight: '700', fontSize: '1rem', color: scoreColor(movie?.vote_average.toFixed(1)) }}>{movie.vote_average.toFixed(1)}</p>
            <p style={{margin: 'auto 0 auto 0.5rem', fontWeight: '600', fontSize: '1rem', color: '#c5c4c4'}}>|&nbsp;&nbsp;{movie?.release_date}</p>
            </div>
            <div style={{display: 'inline-flex',margin: '5px 0 1rem', width: '100%'}}>
            {
                movie.genre_ids.slice(0, 3).map((id) => 
                    <div className="row__genre-button" onClick={() => {navigate(`/genres?genre=${id}`)}}>
                        <p style={{margin: 'auto'}}>{genres[id]}</p>
                    </div>
            )}
            </div>
        </div>
    </div>
  )
}

export default MovieCard
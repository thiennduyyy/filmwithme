import React from 'react'
import '../Rows/Row.scss'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { GenresContext } from '../GenresContext';

const base_url = "https://image.tmdb.org/t/p/w500/";

function Card({movie}) {
    const { setTab } = useContext(GenresContext)
    const { genreList } = useContext(GenresContext)
    const navigate = useNavigate()
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
            onClick={() => navigate(movie.first_air_date ? `/tvshow/${movie.id}` : `/movie/${movie.id}`)}
            className={`row__poster`}
            src={movie.poster_path ? `${base_url}${movie?.poster_path}` : `/notavailable.jpg`}
            alt={movie.name}
        />
        <div style={{padding: '0 15px'}}>
            <div>
            <h4 
                style={{'marginTop': '20px', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden'}}
                onClick={() => navigate(movie.first_air_date ? `/tvshow/${movie.id}` : `/movie/${movie.id}`)}
            >{movie.original_title || movie.name}</h4>
            </div>
            <div style={{'marginTop': '5px', display: 'flex'}}>
            <img alt="imdb" src='/imdb.png' style={{width: '2.5rem', height: 'auto'}}/>
            <p style={{margin: 'auto 0 auto 0.5rem', fontWeight: '700', fontSize: '1rem', color: scoreColor(movie?.vote_average.toFixed(1)) }}>{movie.vote_average.toFixed(1)}</p>
            <p style={{margin: 'auto 0 auto 0.5rem', fontWeight: '600', fontSize: '1rem', color: '#c5c4c4'}}>|&nbsp;&nbsp;{movie?.release_date || movie?.first_air_date}</p>
            </div>
            <div style={{display: 'inline-flex',margin: '5px 0 1rem', width: '100%'}}>
            {
                movie.genre_ids.slice(0, 3).map((id) => 
                    <div className="row__genre-button" onClick={() => {
                        setTab('Movies')
                        navigate(`/genres/${movie?.first_air_date ? 'tv' : 'movie'}?genre=${id}`)
                        }}>
                        <p style={{margin: 'auto', fontSize: '0.9rem'}}>{genreList[id]}</p>
                    </div>
            )}
            </div>
        </div>
    </div>
  )
}

export default Card
import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../components/axios'
import '../styles/MovieDetail.scss'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import EpisodeHandler from '../components/Episodes/EpisodeHandler'

const base_url = "https://image.tmdb.org/t/p/w200";
export default function TVShow() {
    const navigate = useNavigate()
    const [seasons, setSeasons] = useState([])
    const [detail, setDetail] = useState({movie: {}, credits: {}, genres: ''})
    const {id} = useParams()
    useEffect(() => {
        async function fetchDetail() {
            let seasons = []
            const tvShow = await axios.get(`/tv/${id}?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US`)
            // console.log(tvShow.data)
            const credits = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US`)
            // console.log(credits)
            let genres = tvShow.data.genres.map(genre => genre.name)
            // console.log(genres)
            let casts = credits.data.cast?.slice(0,5)
            let director = (tvShow.data.created_by.length > 0) ? tvShow.data.created_by[0] : credits.data.crew?.find(({job}) => job === "Director" || "Executive Producer")
            document.title = tvShow.data.title || tvShow.data.name || tvShow.data.original_name
            tvShow.data.seasons.forEach((season) => {
                if (season.season_number > 0) {
                    seasons.push({season_number: season.season_number, episode_count: season.episode_count}) 
                }
            })
            setSeasons(seasons)
            setDetail({movie: tvShow.data, credits: {casts: casts, director: director}, genres})
        }
        fetchDetail()
    }, [id])
    const scoreColor = (x) => {
        if (x>=7) {
            return '#179617'
        } else if (x>=5 && x<7) {
            return '#ffc107'
        } else {
            return '#f00'
        }
    }
    const {movie, credits: {casts, director}, genres} = detail
  return (JSON.stringify(movie) !== '{}' &&
    <header className="detail" style={{backgroundSize: "cover", backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`, width: '100%', height: '100vh'}}>
        
        <div className="detail__contents">
            <h1 className="detail__title">
            {movie?.name || movie.original_name}
            </h1>
            {/* {seasons && <EpisodeHandler seasons={seasons}/>} */}

            {/* <p style={{fontSize: '1.1rem', fontFamily: "'Muli', sans-serif"}}>{`${Math.floor(movie.runtime/60)} hours ${movie.runtime - Math.floor(movie.runtime/60)*60} minutes`}</p> */}

            
            <div style={{'marginTop': '10px', display: 'flex'}}>
              <img alt="imdb" src='/imdb.png' style={{width: '2.5rem', height: 'auto'}}/>
              <p style={{margin: 'auto 0 auto 0.5rem', fontWeight: '700', fontSize: '1rem', color: scoreColor(movie?.vote_average.toFixed(1)) }}>{movie?.vote_average.toFixed(1)}</p>
            </div>
            <div style={{display: 'inline-flex', margin: '1rem 0 1rem', cursor: 'pointer'}}>
                {genres.map((genre, index) => (
                    (index < (genres.length - 1)) ?
                    <>
                        <p className='detail__genre'>{genre}</p>
                        <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</p>
                    </>
                    :
                    <p className='detail__genre'>{genre}</p>
                ))}
            </div>

            <div style={{marginTop: '1rem', width: 'auto', display: 'flex'}}>
                <button className='detail__button1' onClick={() => navigate(`/tvshow/${movie.id}/watch?s=1&e=1`)}>PLAY</button>
                <button className='detail__button2'>Add to list</button>
                {/* <img
                    onClick={() => navigate(`/tvshow/${movie.id}/watch?s=1&e=1`)}
                    className="detail__button detail__button-play" src='/playbutton.png' alt='play'/>
                <img className="detail__button detail__button-add" src='/addbutton.png' alt='add'/> */}
            </div>

            <p className="detail__description">{movie?.overview}</p>
            <div>
                <h4 style={{fontSize: '1.1rem', fontWeight: '500'}}>Director: </h4>
                <div style={{display: 'flex', flexDirection: 'column', width: '10.5rem', marginTop: '1rem'}}>
                    <img alt={director?.name || 'Unknown'} src={director?.profile_path ? (base_url + director.profile_path) : '/default-user.png'} style={{width: '6.5rem', margin: 'auto',height: '6.5rem', borderRadius: '10%', objectFit: 'cover'}}/>
                    <p style={{margin: '0.5rem auto 0', textAlign: 'center', fontWeight: '500'}}>{director?.name || 'Unknown'}</p>
                    <p style={{margin: '0rem auto 0', textAlign: 'center', fontSize: '0.9rem'}}>{director?.character}</p>
                </div>
            </div>
            <div style={{marginTop: '1rem'}}>
                <h4 style={{fontSize: '1.1rem', fontWeight: '500'}}>Top cast: </h4>
                <div style={{display: 'flex', marginTop: '1rem', gap: '15px'}}>
                    {
                        casts.map((actor) => 
                            <div style={{display: 'flex', flexDirection: 'column', width: '10.5rem'}}>
                                <img alt={actor.name} src={actor.profile_path ? (base_url + actor.profile_path) : '/default-user.png'} style={{width: '6.5rem', margin: '0 auto 0',height: '6.5rem', borderRadius: '10%', objectFit: 'cover'}}/>
                                <p style={{margin: '0.5rem auto 0', textAlign: 'center', fontWeight: '500'}}>{actor.name}</p>
                                <p style={{margin: '0rem auto 0', textAlign: 'center', fontSize: '0.9rem'}}>{actor.character}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        <div className='detail__fateLeft'></div>
        <div className='detail__fateTop'></div>
    </header>
  )
}
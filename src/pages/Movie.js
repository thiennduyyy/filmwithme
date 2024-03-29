import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../components/axios'
import { AiFillPlaySquare } from 'react-icons/ai'
import { AiFillPlusSquare } from 'react-icons/ai'
import '../styles/MovieDetail.scss'
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading/Loading'

const base_url = "https://image.tmdb.org/t/p/w200";
export default function Movie() {
    const navigate = useNavigate()
    function truncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }
    const [detail, setDetail] = useState({movie: {}, credits: {}, genres: ''})
    const {id} = useParams()
    useEffect(() => {
        async function fetchDetail() {
            const movie = await axios.get(`/movie/${id}?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US`)
            const tvShow = await axios.get(`/tv/82856?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US`)
            console.log(tvShow.data)
            const credits = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US`)
            console.log(movie)
            let genres = movie.data.genres.map(genre => genre.name)
            console.log(genres)
            let casts = credits.data.cast?.slice(0,5)
            let director = credits.data.crew?.find(({job}) => job === 'Director')
            document.title = movie.data.title || movie.data.name || movie.data.original_name
            setDetail({movie: movie.data, credits: {casts: casts, director: director}, genres})
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
        // good: '#179617',
        // medium: '#ffc107',
        // bad: '#f00'
    }
    const {movie, credits: {casts, director}, genres} = detail
    console.log(casts)
  return (JSON.stringify(movie) !== '{}' &&
    <header className="detail" style={{backgroundSize: "cover", backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`, width: '100%', minHeight: '100vh'}}>
        <div className="detail__contents">
            <h1 className="detail__title">
            {movie.title || movie?.name || movie.original_name}
            </h1>

            <div style={{display: 'flex'}}>
                <img src='/clock.png' alt='clock' style={{margin: 'auto 10px auto 0', width: '28px', height: '28px'}}/>
                <p style={{margin: 'auto 0 auto 0', fontSize: '1.1rem', fontFamily: "'Muli', sans-serif"}}>{`${Math.floor(movie.runtime/60)} hours ${movie.runtime - Math.floor(movie.runtime/60)*60} minutes`}</p>
            </div>

            
            <div style={{'marginTop': '10px', display: 'flex'}}>
              <img alt="imdb" src='/imdb.png' style={{width: '2.5rem', height: 'auto'}}/>
              <p style={{margin: 'auto 0 auto 0.5rem', fontWeight: '700', fontSize: '1.125rem', color: scoreColor(movie?.vote_average.toFixed(1)) }}>{movie?.vote_average.toFixed(1)}</p>
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
                <button className='detail__button1' onClick={() => navigate(`/movie/${movie.id}/watch`)}>PLAY</button>
                <button className='detail__button2'>Add to list</button>
                {/* <img
                    onClick={() => navigate(`/movie/${movie.id}/watch`)}
                    className="detail__button detail__button-play" src='/playbutton.png' alt='play'/>
                <img className="detail__button detail__button-add" src='/addbutton.png' alt='add'/> */}
            </div>
            <div style={{width: '90%'}}>
                <p className="detail__description">{movie?.overview}</p>
            </div>
            <div>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#d3ce12'}}>Director: </h3>
                <div style={{display: 'flex', flexDirection: 'column', width: '10.5rem', marginTop: '1rem'}}>
                    <img alt={director.name} src={director.profile_path ? (base_url + director.profile_path) : '/default-user.png'} style={{width: '6.5rem', margin: 'auto',height: '6.5rem', borderRadius: '10%', objectFit: 'cover'}}/>
                    <p style={{margin: '0.5rem auto 0', textAlign: 'center', fontWeight: '500', fontSize: '0.9rem'}}>{director.name}</p>
                </div>
            </div>
            <div style={{marginTop: '1rem', width: '90%'}}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#d3ce12'}}>Top cast: </h3>
                <div style={{display: 'flex', marginTop: '1rem', gap: '15px'}}>
                    {
                        casts.map((actor) => 
                            <div style={{display: 'flex', flexDirection: 'column', width: '10.5rem'}}>
                                <img alt={actor.name} src={actor.profile_path ? (base_url + actor.profile_path) : '/default-user.png'} style={{width: '6.5rem', margin: '0 auto 0',height: '6.5rem', borderRadius: '10%', objectFit: 'cover'}}/>
                                <p style={{margin: '0.5rem auto 0', textAlign: 'center', fontWeight: '500', fontSize: '0.9rem'}}>{actor.name}</p>
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
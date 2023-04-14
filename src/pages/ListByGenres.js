import React from 'react'
import axios from '../components/axios'
import '../components/Rows/Row.scss'
import '../styles/ListByGenre.scss'
import { useState } from 'react'
import { useEffect, useContext } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { GenresContext } from '../components/GenresContext'
import MovieCard from '../components/MovieCard/MovieCard'


function ListByGenres() {
//     const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
    const genres = useContext(GenresContext)
    const [searchParams] = useSearchParams()
    const genre_id = searchParams.get('genre')
    console.log('da update', genre_id)
    const [movies, setMovies] = useState([])
    useEffect(() => {
        // window.scrollTo(0, 0);
        const fetchMovies = async () => {
            const movieList = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=efcd4adc614afb568e483ea646cf5b28&with_genres=${genre_id}`)
            setMovies(movieList.data.results)
        }
        fetchMovies()
    }, [genre_id])
  return (
    <div style={{backgroundColor: '#0b111b', paddingBottom: '1rem', paddingTop: '72px'}}>
        <div style={{color: 'white', height: '560rem', position: 'relative', padding: '0 8rem' }}>
            <h2 style={{color: 'white', margin: '1rem 0 0.5rem'}}>Genre: {genres[genre_id]}</h2>
            <div className='list__container'>
                {movies.map((movie) => 
                    <MovieCard movie={movie}/>)
                }
            </div>
        </div>
    </div>
  )
}

export default ListByGenres
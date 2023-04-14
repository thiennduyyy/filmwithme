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
    const genres = useContext(GenresContext)
    const [searchParams] = useSearchParams()
    const searchString = searchParams.get('search')
    // console.log('da update', searchString)
    const [movies, setMovies] = useState([])
    useEffect(() => {
        const fetchMovies = async () => {
            const movieList = await axios.get(`/search/keyword?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US&page=1`, { query: searchString})
            console.log(movieList)
            setMovies(movieList.data.results)
        }
        fetchMovies()
    }, [searchString])
    console.log()
  return (
    <div style={{backgroundColor: '#0b111b', paddingBottom: '1rem', paddingTop: '72px'}}>
        <div style={{color: 'white', height: '560rem', position: 'relative', padding: '0 8rem' }}>
            <h2 style={{color: 'white', margin: '1rem 0 0.5rem'}}>Search for: {searchString}</h2>
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
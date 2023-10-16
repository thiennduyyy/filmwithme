import React from 'react'
import axios from '../components/axios'
import '../components/Rows/Row.scss'
import '../styles/ListByGenre.scss'
import { useState } from 'react'
import { useEffect, useContext } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { GenresContext } from '../components/GenresContext'
import MovieCard from '../components/Card/Card'
import Row from '../components/Rows/Row'


function ListByGenres() {
    const { type } = useParams()
    console.log(type)
    const { genreList } = useContext(GenresContext)
    const [searchParams] = useSearchParams()
    const genre_id = searchParams.get('genre')
    console.log('da update', genre_id)
    const [url, setUrl] = useState(`/discover/${type}?api_key=efcd4adc614afb568e483ea646cf5b28&with_genres=${genre_id}`)
    useEffect(() => {
        setUrl(`/discover/${type}?api_key=efcd4adc614afb568e483ea646cf5b28&with_genres=${genre_id}`)
    }, [genre_id, type])
  return (
    <div style={{backgroundColor: '#0e0e0e', paddingBottom: '1rem', paddingTop: '72px'}}>
        <div style={{color: 'white', height: '560rem', position: 'relative'}}>
            <Row fetchUrl={url} title={`Genre: ${genreList[genre_id]}`} amount={20}/>
        </div>
    </div>
  )
}

export default ListByGenres
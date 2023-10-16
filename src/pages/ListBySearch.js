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


function ListBySearch() {
    const genres = useContext(GenresContext)
    const [searchParams] = useSearchParams()
    const searchString = searchParams.get('search')
    // console.log('da update', searchString)
    const [url, setUrl] = useState(`/search/movie?api_key=efcd4adc614afb568e483ea646cf5b28&query=${searchString}&language=en-US&page=1`)
    useEffect(() => {
        setUrl(`/search/movie?api_key=efcd4adc614afb568e483ea646cf5b28&query=${searchString}&language=en-US&page=1`)
    }, [searchString])
    console.log()
  return (
    <div style={{backgroundColor: '#0e0e0e', paddingBottom: '1rem', paddingTop: '72px', minHeight: '100vh'}}>
        <div style={{color: 'white', position: 'relative'}}>
            <Row fetchUrl={url} title={`Search for: ${searchString}`} amount={20}/>
        </div>
    </div>
  )
}

export default ListBySearch
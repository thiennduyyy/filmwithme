import axios from './axios'
import React from 'react'
import {useEffect, createContext, useState} from 'react'

const getGenres = async () => {
    let genresList = {}
    
    const genres = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US')
    genres.data.genres.filter((genre) => genresList[`${genre.id}`]=genre.name)
    return genresList
}
  
const GenresContext = createContext()

function GenresProvider({children}) {
    const [genreList, setGenreList] = useState([])
    useEffect(() => {
        document.title = 'Film with me'
        getGenres().then(res => setGenreList(res))
    }, [])
  return (
    <GenresContext.Provider value={genreList}>
        {children}
    </GenresContext.Provider>
  )
}

export {GenresContext, GenresProvider}
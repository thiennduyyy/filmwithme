import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../components/axios'
import '../styles/MoviePlayer.scss'

function MoviePlayer() {
    
    const params = useParams()
    const {id} = params
    const [movie, setMovie] = useState({})
    useEffect(() => {
        async function fetchMovie() {
            const movie = await axios.get(`/movie/${id}?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US`)
            setMovie(movie.data)
        }
        fetchMovie()
    }, [])
  return (
    <div style={{display: 'flex', paddingBottom: '72px'}}>
      <div style={{minHeight: '100vh', width: '96rem', backgroundColor: 'inherit', display: 'flex', flexDirection: 'column', margin: 'auto'}}>
          <iframe 
              allowFullScreen
              style={{width: '100%', height: '52rem', margin: '100px auto 0 auto'}} 
              title={movie.original_title} 
              src={`https://2embed.cc/embed/${movie.imdb_id}`}></iframe>
          <h2 style={{marginTop: '1.5rem', color: 'white'}}>Discussion</h2>
          <div style={{marginTop: '1.5rem', border: '1px solid white', borderRadius: '4px', width: '40%', backgroundColor: '#18202c'}}>
            <div style={{borderBottom: '1px solid white', padding: '10px'}}>
              <textarea className='comment' placeholder='Write comment here...'></textarea>
            </div>
            <div style={{height: '', display: 'flex', backgroundColor: '#272f3d', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px'}}>
              <button className='comment__button'>Post</button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default MoviePlayer
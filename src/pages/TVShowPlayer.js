import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from '../components/axios'
import '../styles/MoviePlayer.scss'
import EpisodeHandler from '../components/Episodes/EpisodeHandler'

function TVShowPlayer() {
    const [searchParams, setSearchParams] = useSearchParams()
    const season = searchParams.get('s')
    const episode = searchParams.get('e')
    // const season = searchParams.get('s')
    // const episode = searchParams.get('e')
    const params = useParams()
    // console.log(params)
    const { id } = params
    const [tvShow, setTvShow] = useState({})
    const [seasons, setSeasons] = useState()
    useEffect(() => {
        async function fetchMovie() {
            const tvShow = await axios.get(`/tv/${id}?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US`)
            setTvShow(tvShow.data)
            let seasonsList = tvShow.data.seasons.filter((season) => season.season_number > 0)
            setSeasons(seasonsList)
        }
        fetchMovie()
    }, [id])
  return (
    <div style={{display: 'flex', paddingBottom: '72px'}}>
      <div style={{minHeight: '100vh', width: '96rem', backgroundColor: 'inherit', display: 'flex', flexDirection: 'column', margin: 'auto'}}>
            <iframe 
                style={{width: '100%', height: '52rem', margin: '100px auto 0 auto'}} 
                title={tvShow.original_title} 
                src={`https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`}></iframe>
            {seasons && <EpisodeHandler seasons={seasons} season={season} episode={episode}/>}
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

export default TVShowPlayer
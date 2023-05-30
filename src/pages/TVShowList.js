import React from 'react'
import axios from '../components/axios'
import '../components/Rows/Row.scss'
import '../styles/ListByGenre.scss'
import { tvURL } from '../requests'
import { useState } from 'react'
import { useEffect, useContext } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { GenresContext } from '../components/GenresContext'
import Row from '../components/Rows/Row'
import MovieCard from '../components/Card/Card'


function TvShows() {
  return (
    <div style={{backgroundColor: '#0b111b', paddingBottom: '1rem', paddingTop: '72px'}}>
        <div style={{color: 'white', position: 'relative'}}>
            <Row title='Top rated' fetchUrl={tvURL.topRated} amount={10}/>
            <Row title='Airing today' fetchUrl={tvURL.airingToday} amount={10}/>
            <Row title='Popular' fetchUrl={tvURL.popular} amount={10}/>
            <Row title='TV on the air' fetchUrl={tvURL.onTheAir} amount={10}/>
        </div>
    </div>
  )
}

export default TvShows
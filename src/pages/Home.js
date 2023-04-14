import React, { useEffect, useState } from "react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import axios from '../components/axios'
import Row from "../components/Rows/Row";
import BannerSlider from "../components/BannerSlider/BannerSlider";
import requests from "../requests";
import { useParams } from "react-router-dom";

const getGenres = async () => {
  let genresList = {}
  
  const genres = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US')
  genres.data.genres.filter((genre) => genresList[`${genre.id}`]=genre.name)
  return genresList
}

function Home() {
  const [genres, setGenres] = useState({})
  //   getGenres().then(res => setGenres(res))
    const params = useParams()
    console.log({params})
  useEffect(() => {
    document.title = 'Movieworld'
    getGenres().then(res => setGenres(res))
  }, [])
  return (JSON.stringify(genres) !== '{}' &&
    <div style={{backgroundColor: '#0b111b', paddingBottom: '0.5rem'}}>
      <BannerSlider/>
      <div style={{marginTop: '2rem'}}>
        <Row title="Popular" fetchUrl={requests.popular} genres={genres}/>
        <Row title="Top Rated" fetchUrl={requests.topRated} genres={genres}/>
        <Row title="Upcoming" fetchUrl={requests.upcoming} genres={genres}/>
        <Row title="Now playing" fetchUrl={requests.nowPlaying} genres={genres}/>
      </div>
    </div>
  );
}

export default Home;
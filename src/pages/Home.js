import React, { useEffect, useState } from "react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import axios from '../components/axios'
import Row from "../components/Rows/Row";
import BannerSlider from "../components/BannerSlider/BannerSlider";
import { moviesURL } from "../requests";
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
        <Row title="Popular" fetchUrl={moviesURL.popular} amount={5}/>
        <Row title="Top Rated" fetchUrl={moviesURL.topRated} amount={5}/>
        <Row title="Upcoming" fetchUrl={moviesURL.upcoming} amount={5}/>
        <Row title="Now playing" fetchUrl={moviesURL.nowPlaying} amount={5}/>
      </div>
    </div>
  );
}

export default Home;
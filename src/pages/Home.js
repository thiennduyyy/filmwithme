import React, { useEffect, useState, lazy } from "react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import axios from '../components/axios'
import Row from "../components/Rows/Row";
import BannerSlider from "../components/BannerSlider/BannerSlider";
import { moviesURL } from "../requests";
import { useParams } from "react-router-dom";
import { GenresContext } from "../components/GenresContext";
import { useContext } from "react";
const Movies = lazy(() => import("./Movies"));
const TvShows = lazy(() => import("./TVShowList"));

const getGenres = async () => {
  let genresList = {}
  
  const genres = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US')
  genres.data.genres.filter((genre) => genresList[`${genre.id}`]=genre.name)
  return genresList
}

function Home() {
  const [genres, setGenres] = useState({})
  const { tab } = useContext(GenresContext)
  //   getGenres().then(res => setGenres(res))
  const params = useParams()
  console.log({params})
  useEffect(() => {
    document.title = 'Movieworld'
    getGenres().then(res => setGenres(res))
  }, [])
  if (tab === 'Home' && JSON.stringify(genres) !== '{}') 
  {
    return (
      <>
      <div style={{backgroundColor: '#010002', paddingBottom: '0.5rem'}}>
        <BannerSlider/>
        <div style={{marginTop: '2rem'}}>
          <Row title="Popular" hasIcon={true} fetchUrl={moviesURL.popular} amount={5}/>
          <Row title="Top Rated" hasIcon={true} fetchUrl={moviesURL.topRated} amount={5}/>
          <Row title="Upcoming" hasIcon={true} fetchUrl={moviesURL.upcoming} amount={5}/>
          <Row title="Now playing" hasIcon={true} fetchUrl={moviesURL.nowPlaying} amount={5}/>
        </div>
      </div>
      </>
    )
  } else {
    return (tab === 'Movies') ? <Movies/> : <TvShows/>
  }
}

export default Home;
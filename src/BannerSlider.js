import React, {useState, useEffect} from 'react'
import axios from './axios'
import requests from './requests'
import { Navigation, Thumbs, Autoplay } from 'swiper'
import "./Banner.scss"
import { Swiper, SwiperSlide } from 'swiper/react'


function BannerSlider() {
  const [movies, setMovies] = useState()


  useEffect(()=>{
      async function fetchData(){
        const request = await axios.get(requests.topRated)
        console.log(request.data.results)
        setMovies(request.data.results)
        return request;
      };
      fetchData();
  }, []);

  function truncate(str, n){
    return str?.length > n ? str.substr(0, n-1) + "..." : str;
  }

  return (
    <Swiper 
      loop={false}
      spaceBetween={0}
      navigation={true}
      modules={[Navigation, Autoplay, Thumbs]}
      grabCursor={true}
      autoplay={{ disableOnInteraction: false, delay: 5000}}
      pagination={{ clickable: false}}
    >
      {movies && movies.map((movie, index) =>
        (<SwiperSlide key={index}>
          <header className="banner" style={{backgroundSize: "cover", backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`}}>
            <div className="banner__contents">
              <h1 className="banner__title">
                {movie?.title || movie?.name || movie?.original_name}
              </h1>

              <div className="banner__buttons">
                <button className="banner__button">Play</button>
                <button className="banner__button">My List</button>
              </div>

              <h1 className="banner__description">{truncate(movie?.overview, 300)}</h1>
            </div>

            <div className="banner__fateBottom"/>
          </header>
        </SwiperSlide>)
      )}
    </Swiper>
  )
}

export default BannerSlider

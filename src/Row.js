import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.scss";
import { FaImdb } from 'react-icons/fa'

const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request.data.results)
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  function truncate(str, n){
    return str?.length > n ? str.substr(0, n-1) + "..." : str;
  }

  const handleClick = (movie) => {
    axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US`)
    .then(res => console.log(res.data))
  };
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__movies">
        {movies && movies.map((movie) => (
          <div className="row__movie">
            <img
              draggable="false"
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster`}
              // src={`${base_url}${`${base_url}${( movie.poster_path && movie.backdrop_path)?(isLargeRow ? movie.poster_path : movie.backdrop_path):'mv4lRdLy201m3pndE68MuIKofpt.jpg'}`}`}
              src={`${base_url}${movie?.backdrop_path}`}
              alt={movie.name}
            />
            <div>
              <h4 style={{'marginTop': '10px', cursor: 'pointer'}}>{movie.original_title}</h4>
            </div>
            <div style={{'marginTop': '10px', display: 'flex'}}>
              {/* <FaImdb style={{color: 'yellow', fontSize: '2rem'}} /> */}
              <img alt="imdb" src='/imdb.png' style={{width: '2.5rem', height: 'auto'}}/>
              <p style={{margin: 'auto 0 auto 0.5rem', fontWeight: '500'}}>{movie.vote_average.toFixed(1)}</p>
            </div>
            <div style={{'padding': '0 10px 0 0', 'marginTop': '10px'}}>
              <p>{truncate(movie.overview, 120)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;

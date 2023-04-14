import React, { useState, useEffect } from "react";
import "./Row.scss";
import axios from '../axios';
import { useNavigate } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";

const base_url = "https://image.tmdb.org/t/p/w500/";

function Row({ title, fetchUrl }) {
  const scoreColor = (x) => {
    if (x>=7) {
        return '#179617'
    } else if (x>=5 && x<7) {
        return '#ffc107'
    } else {
        return '#f00'
    }
}
  const navigate = useNavigate()
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

  const handleNavigate = (id) => {
    navigate(`/movie/${id}`)
  };
  return (
    <div className="row">
      <div style={{marginBottom: '5px', display: 'flex', justifyContent: 'space-between'}}>
        <h2 style={{color: ''}}>{title}</h2>
        <p className="row__expand" style={{margin: 'auto 0', '&:hover': '#6bccce'}}>See all </p>
      </div>

      <div className="row__movies">
        {movies && movies.slice(0, 5).map((movie) => (
          <MovieCard movie={movie}/>
        ))}
      </div>
    </div>
  );
}

export default Row;

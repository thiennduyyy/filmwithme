import React, { useState, useEffect } from "react";
import "./Row.scss";
import axios from '../axios';
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";

const base_url = "https://image.tmdb.org/t/p/w500/";

function Row({ title, fetchUrl, amount }) {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log('Fetch done', request.data.results)
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <div style={{marginBottom: '5px', display: 'flex', justifyContent: 'space-between'}}>
        <h2 style={{color: ''}}>{title}</h2>
        {amount < 20 &&
          <p className="row__expand" style={{margin: 'auto 0', '&:hover': '#6bccce'}}>See all </p>}
      </div>

      <div className="row__movies">
        {movies && movies.slice(0, amount).map((movie) => (
          <Card movie={movie}/>
        ))}
      </div>
    </div>
  );
}

export default Row;

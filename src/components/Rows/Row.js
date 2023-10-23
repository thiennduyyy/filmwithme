import React, { useState, useEffect } from "react";
import "./Row.scss";
import axios from '../axios';
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";

const base_url = "https://image.tmdb.org/t/p/w500/";

function Row({ title, fetchUrl, amount, hasIcon }) {
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
        {hasIcon ?
          <div style={{display: 'flex'}}>
            <img
              style={{margin: 'auto 15px auto 0'}}
              className="nav__logo" src={`/${title}.png`} alt="Popular logo" />
            <h2 style={{color: '#2d9bdf', margin: 'auto'}}>{title.toUpperCase()}</h2>
          </div>
        :
          <h2 style={{color: '', marginBottom: '15px'}}>{title}</h2>
        }
        {amount < 20 &&
          <div className="row__expand">
            <p style={{margin: 'auto 0', fontSize: '16px'}}>See all</p>
            <img width="12" height="12" style={{margin: 'auto 0 auto 8px'}} src="/rightArrow.png" alt="Go to"/>
          </div>
          }
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

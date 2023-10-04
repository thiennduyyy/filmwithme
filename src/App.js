import React, { useEffect, useState,Suspense, createContext} from "react";
import "./App.scss";
import ScrollToTop from "./components/scrollToTop";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import Home from "./pages/Home";
import Nav from "./components/Nav/Nav";
import axios from './components/axios'
import MoviePlayer from "./pages/MoviePlayer";
import Loading from "./components/Loading/Loading";
import { GenresProvider } from "./components/GenresContext";
import ListByGenres from "./pages/ListByGenres";
import ListBySearch from "./pages/ListBySearch"
import TvShows from "./pages/TVShowList";
import TVShow from "./pages/TVShow";
import Movies from "./pages/Movies";
const Movie = React.lazy(() => import("./pages/Movie"));


function App() {
  return (
    <div className="App">
      <GenresProvider>
        <Router>
          <Nav/>
          <Suspense fallback={<Loading />}>
            <ScrollToTop>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/movie/:id" element={<Movie/>}/>
                  <Route path="/tvshow/:id" element={<TVShow/>}/>
                  <Route path="/tvshows" element={<TvShows/>}/>
                  <Route path="/movies" element={<Movies/>}/>
                  <Route path="/genres/:type" element={<ListByGenres/>}/>
                  <Route path="/list" element={<ListBySearch/>}/>
                  <Route path="/movie/:id/watch" element={<MoviePlayer/>}/>
              </Routes>
            </ScrollToTop>
          </Suspense>
        </Router>
      </GenresProvider>
    </div>
  );
}

export default App;

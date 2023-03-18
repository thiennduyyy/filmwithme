import React from "react";
import "./App.scss";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import Row from "./Row";
import BannerSlider from "./BannerSlider";
import Nav from "./Nav";
import requests from "./requests";


function App() {
  return (
    <div className="App">
      <Nav />
      <BannerSlider/>
      <Row title="Popular" fetchUrl={requests.popular} />
      <Row title="Top Rated" fetchUrl={requests.topRated} />
      <Row title="Upcoming" fetchUrl={requests.upcoming} />
      <Row title="Now playing" fetchUrl={requests.nowPlaying} />
      {/* <iframe src="https://2embed.org/embed/movie?imdb=tt0068646" title="test" style={{'width': '100%', 'height': '700px' }}/> */}
      {/* <iframe title="porn" width="560" height="315" src="https://spankbang.party/7r4pm/embed/" frameborder="0" scrolling="no" allowfullscreen></iframe> */}
    </div>
  );
}

export default App;

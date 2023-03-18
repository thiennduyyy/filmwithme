const API_KEY = "efcd4adc614afb568e483ea646cf5b28";

const requests = {
  popular: `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  nowPlaying: `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
  topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  upcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
};


export default requests;

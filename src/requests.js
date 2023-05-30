const API_KEY = "efcd4adc614afb568e483ea646cf5b28";

const moviesURL = {
  popular: `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  nowPlaying: `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
  topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  upcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
};
const tvURL = {
  popular: `/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  topRated: `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  onTheAir: `/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,
  airingToday: `/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
}


export {moviesURL, tvURL};

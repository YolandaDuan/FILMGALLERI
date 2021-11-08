import React, { useEffect, useState } from 'react';
import './App.css';

import axios, { AxiosResponse } from 'axios';

const api_key: string = "33d86b38306a4cf34f60d66de057744e";
const BASE_URL: string = "https://api.themoviedb.org/3"; 
const getImage = (path: string) => `https://image.tmdb.org/t/p/w300/${path}`;

interface Movie {
  genre_ids: number[],
  id: number
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number
};

interface MoviesResponse {
  date: {
    maximum: string,
    minimum: string
  },
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number
}



const App: React.FC = () => {
  const [data, setData] = useState<Movie[]>([]);
  
  const api = axios.create({ baseURL: BASE_URL });

  const getPopularMovies = api.get<MoviesResponse>("movie/now_playing", { params: { api_key } });

  useEffect(() => {
    getPopularMovies.then((res) => {
      console.log(res);
      setData(res.data.results);
    });
  }, []);
  
  return (
    <div className="App">
      <div className="header">
        <h1>Filmgalleri</h1>
      </div>
        <h2>Popular movies today</h2>
        <div className="movielist">
          {data.map((movie) => (
            <div key={movie.id} className="movie">
              <img src={getImage(movie.poster_path)} alt="movie poster"/>
              <p>{movie.original_title}</p>
            </div>
          ))}
        </div>
      
    </div>
  );
}

export default App;

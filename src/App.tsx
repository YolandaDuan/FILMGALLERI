import React, { useEffect, useState } from 'react';
import './App.css';

import axios, { AxiosResponse } from 'axios';

import { Movie } from './interface/Movie';
import { MoviesResponse } from './interface/MoviesResponse';
import Search  from './components/Search';

const api_key: string = "33d86b38306a4cf34f60d66de057744e";
const BASE_URL: string = "https://api.themoviedb.org/3"; 
const getImage = (path: string) => `https://image.tmdb.org/t/p/w300/${path}`;


const App: React.FC = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [searchData, setSearchData] = useState<Movie[]>([]);
  
  const api = axios.create({ baseURL: BASE_URL });

  const getPopularMovies = api.get<MoviesResponse>("movie/now_playing", { params: { api_key } });

  useEffect(() => {
    getPopularMovies.then((res) => {
      console.log(res.data.results.length);
      setData(res.data.results);
    });
  }, []);
  
  return (
    <div className="App">
      <div className="header">
        <h1>Filmgalleri</h1>
      </div>
        <Search />
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

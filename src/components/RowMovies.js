import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import { Link } from "react-router-dom";

const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow, query }) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if(query) {
        fetchUrl = fetchUrl + "&query=" + query;
      }
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl, query]);

  return (
    <div className="row">
      <h4>{title}</h4>
      <div className="row_posters">
        {
            movies.map(
            (movie) =>
                movie.backdrop_path !== null && (
                  <Link to={`/Movie/${movie.id}`}>
                    <img
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${baseImgUrl}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                        alt={movie.name}
                        key={movie.id}
                    />
                  </Link>
                )
            )
        }
      </div>
    </div>
  );
}

export default Row;
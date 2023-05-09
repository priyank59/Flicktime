import "../index.css";
import "./Row.css";

import React, { useState, useEffect } from "react";
import axios1 from "../axios";
import { Link } from "react-router-dom";
import { projectFirestore } from '../firebase/config';
import { doc, getDoc } from "firebase/firestore";
import { Container } from "react-bootstrap";

const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow, query, isRecommand }) {

  const [movies, setMovies] = useState([]);

  const email = localStorage.getItem('email');
	
	var recommList;
	
  var finalList = [];

  useEffect(() => {
    if(!isRecommand) {
      async function fetchDataOthers() {
        if(query) {
          fetchUrl = fetchUrl + "&query=" + query;
        }
        const request = await axios1.get(fetchUrl);
        setMovies(request.data.results);
        return request;
      }
      fetchDataOthers();
    }
    else {
      async function fetchDataRecommended() {
        const docRef = doc(projectFirestore, "userRecommendations", email);
        const docSnap = await getDoc(docRef);
      
        if(docSnap.exists()) {

          recommList = docSnap.data().recommendationList;
        
          Object.values(recommList).forEach((value, index) => {
            finalList.push(parseInt(value));
          })
        }

        var moviesList = [];
        moviesList = await Promise.all(
          finalList.map(
            async (e) => {
              fetchUrl = `https://api.themoviedb.org/3/movie/${e}?api_key=964bd231b237392f459b9752e8e1b75b`
              const request = await axios1.get(fetchUrl);
              const data = request.data
              return {'id':data.id, 'backdrop_path':data.backdrop_path, 'poster_path':data.poster_path, 'title':data.title}
            }
          )
        )
        setMovies(moviesList);
      }
      fetchDataRecommended();
    }
  }, [query, isRecommand]);


  return (
    <div className="row">
      <h4 className="color-dark"> <b> {title} </b> </h4>
      <Container>
        <div className="row_posters">
          { 
            movies && movies.map(
              (movie) => {
                return movie.backdrop_path !== null && (
                  <Link to={`/Movie/${movie.id}`} style={{textDecoration:'none'}}>
                    <img
                      className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                      src={`${baseImgUrl}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                      }`}
                      alt={movie.title}
                      key={movie.id}
                    />
                    <div className="btn-dark-style" style={{paddingTop:5, textAlign:'center', fontSize:15}}>{movie.title}</div>
                  </Link>
                )
              }
            )
          }
        </div>
      </Container>
    </div>
  );
}

export default Row;
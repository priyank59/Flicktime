import "./Row.css";
import React from 'react';
import Youtube from "react-youtube";
import axios from "../axios";
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { projectFirestore } from '../firebase/config';
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

// const Movie = ({route,navigate}) => {
const Movie = () => {

    const { movieId } = useParams();
    const [trailerUrl, setTrailerUrl] = useState("");

    const [title, setTitle] = useState("");
    const [overview, setOverview] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [tagline, setTagline] = useState("");
    const [voteAverage, setVoteAverage] = useState("");
    const [voteCount, setVoteCount] = useState("");
    const [runtime, setRuntime] = useState("");
    const [budget, setBudget] = useState("");
    const [adult, setAdult] = useState("");
    const [popularity, setPopularity] = useState("");

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          autoplay: 1,
        },
    };

    useEffect(() => {

        updateDoc(doc(projectFirestore, "userHistory", localStorage.getItem('email')), {
            historyList: arrayUnion(movieId)
        });

        axios.get(
            `movie/${movieId}?api_key=964bd231b237392f459b9752e8e1b75b`
        ).then( (response) => {            
            setTitle(response.data.title);
            setOverview(response.data.overview);
            setReleaseDate(response.data.release_date);
            setTagline(response.data.tagline);
            setVoteAverage(response.data.vote_average);
            setVoteCount(response.data.vote_count);
            setRuntime(response.data.runtime);
            setBudget(response.data.budget);
            setAdult(response.data.adult);
            setPopularity(response.data.popularity);
        })

        axios.get(
            `/movie/${movieId}/videos?api_key=964bd231b237392f459b9752e8e1b75b`
        ).then( (response) => {
            if(response.data.results.length > 0) {
                var notFound = false;
                response.data.results.forEach(movieDetails => {
                if(movieDetails.name === "Official Trailer") {
                    setTrailerUrl(movieDetails.key);
                }
                else if(movieDetails.name === "Official Trailer 1") {
                    setTrailerUrl(movieDetails.key);
                }
                else {
                    notFound = true;
                }
                });
                if(notFound) {
                setTrailerUrl(response.data.results[0].key);
                }
            }
            else {
                toast.error('Error fetching the movie trailer, try later!!! :(', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            }
        })   
    }, [])
    
	return (
		<React.Fragment>
			<Container className='py-5 code'>

                <Container> {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />} </Container>

                <Container> <h4>Name:</h4><h5> {title}</h5> </Container>
                <Container> <h4>Overview:</h4><h5> {overview}</h5> </Container>
                <Container> <h4>Release Date:</h4><h5> {releaseDate}</h5> </Container>
                <Container> <h4>Tagline:</h4><h5> {tagline}</h5> </Container>
                <Container> <h4>Vote Average:</h4><h5> {voteAverage}</h5> </Container>
                <Container> <h4>Vote Count:</h4><h5> {voteCount}</h5> </Container>
                <Container> <h4>Runtime:</h4><h5> {runtime}</h5> </Container>
                <Container> <h4>Budget:</h4><h5> {budget}</h5> </Container>
                <Container> { adult && <h4>Adult</h4> } </Container>
                <Container> <h4>Popularity:</h4><h5> {popularity}</h5> </Container>
                
			</Container>
		</React.Fragment>
	);
}

export default Movie;
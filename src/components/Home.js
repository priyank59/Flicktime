import '../index.css';
import React from 'react';
import RowMovies from "./RowMovies";
import requests from "../requests";
import { Container } from 'react-bootstrap';
import { projectFirestore } from '../firebase/config';
import {useState,useEffect} from 'react';

import Form from 'react-bootstrap/Form';

const Home = () => {

	const [searchQuery, setSearchQuery] = useState();
	
	useEffect(() => {
		const unsub = projectFirestore.collection('userDetails')
		  .onSnapshot(snap => {
			let documents = [];
			snap.forEach(doc => {
			  documents.push({...doc.data(), id: doc.id});
			});
		  });

		return () => unsub();
		// this is a cleanup function that react will run when
		// a component using the hook unmounts
	  }, []);


	return (
		<React.Fragment>
			<Container className='py-5 code'>
				<Form.Control name="searchInput" type="search" placeholder="Search" className="me-auto" aria-label="Search" onChange={(e) => setSearchQuery(e.currentTarget.value)}/>
				{searchQuery && <RowMovies title="Search result" fetchUrl={requests.fetchSearch} query={searchQuery} />}				
				<RowMovies title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow/>
				<RowMovies title="Top Rated" fetchUrl={requests.fetchTopRated} />
				<RowMovies title="Action Movies" fetchUrl={requests.fetchActionMovies} />
				<RowMovies title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
				<RowMovies title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
				<RowMovies title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
				<RowMovies title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
				<RowMovies title="Similar to Avatar:Way of water" fetchUrl={requests.fetchDemo} /> 
			</Container>
		</React.Fragment>
	)
}

export default Home;
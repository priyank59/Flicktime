import '../index.css';
import React from 'react';
import RowMovies from "./RowMovies";
import requests from "../requests";
import { Container } from 'react-bootstrap';
import { useState } from 'react';

import Form from 'react-bootstrap/Form';

const Home = () => {

	const [searchQuery, setSearchQuery] = useState();
 
	return (
		<React.Fragment>
			<Container className='py-5 code'>
				<Form.Control name="searchInput" type="search" placeholder="Search" className="me-auto color-dark" aria-label="Search" onChange={(e) => setSearchQuery(e.currentTarget.value)}/>
				{searchQuery && <RowMovies title="Search result" fetchUrl={requests.fetchSearch} query={searchQuery} isRecommand={false}/>}	
				<RowMovies title="Trending Now" fetchUrl={requests.fetchTrending} isRecommand={false} isLargeRow/>
				<RowMovies title="Recommended" isRecommand={true}/>
				<RowMovies title="Top Rated" fetchUrl={requests.fetchTopRated} isRecommand={false}/>
				<RowMovies title="Action Movies" fetchUrl={requests.fetchActionMovies} isRecommand={false}/>
				<RowMovies title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} isRecommand={false} />
				<RowMovies title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} isRecommand={false}/>
				<RowMovies title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} isRecommand={false} />
				<RowMovies title="Documentaries" fetchUrl={requests.fetchDocumentaries} isRecommand={false}/>
			</Container>
		</React.Fragment>
	)
}

export default Home;
import React from 'react';
import { Container } from 'react-bootstrap';
import globalVariable from '../globalVar';

const Home = () => {

	const email = globalVariable.email;

	return (
		<React.Fragment>
			<Container className='py-5'>
				<h3 className='fw-normal'>Welcome Home. {email}</h3>
			</Container>
		</React.Fragment>
	)
}

export default Home;
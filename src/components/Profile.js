import React from 'react';
import { Container } from 'react-bootstrap';
// import { projectFirestore } from '../firebase/config';
import globalVariable from "../globalVar";

const Profile = () => {

	const email = globalVariable.email;

	return (
		<React.Fragment>
			<Container className='py-5'>
				<h3 className='fw-normal'>Profile { email } </h3>
				
			</Container>
		</React.Fragment>
	)
}

export default Profile;
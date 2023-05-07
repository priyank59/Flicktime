import user from './user.png';

import React from 'react';
import { Container } from 'react-bootstrap';
import { projectFirestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';

const Profile = () => {

	const email = localStorage.getItem('email');
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();

	const centerDivStyle = {
		display: 'flex',
		justifyContent:'center',
		alignItems:'center',
		padding:25
	};

	useEffect( async () => {
		const docRef = doc(projectFirestore, "userDetails", email);
        const docSnap = await getDoc(docRef);
		if(docSnap.exists()) {
			setFirstName(docSnap.data().firstName);
			setLastName(docSnap.data().lastName);
		}
	}, []);

	return (
		<React.Fragment>

			<Container style={centerDivStyle}>
				<Container id="border" className='code color-dark'>

					<Container style={centerDivStyle}>
						<img src={user} alt='User Image' width="150" height="150"/>
					</Container>

					<Container style={centerDivStyle}>
						<h3> <b> Profile Details </b> </h3>
					</Container>

					<Container style={centerDivStyle}>
						<div>
							<h4> <b> First Name: </b> {firstName} </h4>
							<h4> <b> Last Name: </b> {lastName} </h4>
							<h4> <b> Email address: </b> {email} </h4>
						</div>
					</Container>

				</Container>
			</Container>

		</React.Fragment>
	)
}

export default Profile;
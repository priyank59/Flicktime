import React from 'react';
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const About = () => {

	const centerDivStyle = {
		display: 'flex',
		justifyContent:'center',
		alignItems:'center',
		padding:25
	};

	return (
		
		<Container style={centerDivStyle}>
			<Container id="border" className='code color-dark'>
				<Container style={centerDivStyle}>
					<h3> <b> About Us </b> </h3>
				</Container>
				<Container style={centerDivStyle}>
						<div>
							<h4> We are providing movies which you would love the most! Hope we get lots of support in return!!! </h4>
						</div>
					</Container>
			</Container>
		</Container>

	)
}

export default About;
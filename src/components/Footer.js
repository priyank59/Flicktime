import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="bg-light border-top py-3 fixed-bottom code">
                <Container>
                    &copy; FlickTime
                </Container>
            </footer>
        </React.Fragment>
    );
}

export default Footer;
import React from 'react'
import {Nav, Navbar, Container} from 'react-bootstrap';
import { Link } from "react-router-dom";


function DisplayNavbar() {
  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Link to ="/">Home</Link></Navbar.Brand>
          <Nav className="me-auto">
            <Link to ="/client">Client</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default DisplayNavbar
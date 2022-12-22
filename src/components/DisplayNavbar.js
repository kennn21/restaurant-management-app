import React from 'react'
import {Nav, Navbar, Container} from 'react-bootstrap';
import { Link } from "react-router-dom";


function DisplayNavbar() {
  //Calls the Navbar Component, turn on for development purposes

  //Currently turned off for production use
  return (
    <>
    {/* <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Link to ="/">Home</Link></Navbar.Brand>
          <Nav className="me-auto">
            <Link to ="/client" className="p-2">Client</Link>
            <Link to ="/receipts" className="p-2">Receipts</Link>
          </Nav>

        </Container>
      </Navbar> */}
    </>
  )
}

export default DisplayNavbar
import React from 'react'
import { Button, Container, Dropdown, Image, Nav, Navbar } from 'react-bootstrap'

function NavBar({ handleShow, user }) {

    console.log("userrrrrrrrrrrrr", user)
    return (
        <Navbar bg="dark" expand="lg" style={{ height: "6vh" }}>
            <Container fluid>
                <Navbar.Brand>
                    <Button variant='success' onClick={handleShow}>My Contacts</Button>
                </Navbar.Brand>

                <Navbar>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Navbar.Brand href="#" className='text-white'>SocketBuddy</Navbar.Brand>
                    </Nav>

                </Navbar>

                <Navbar>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <div className='d-flex'>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ background: "none", border: "none" }}>
                                    <Image roundedCircle src={user?.pic} alt={user?.name} width="30px" />
                                </Dropdown.Toggle>


                                <Dropdown.Menu>
                                    <Dropdown.Item>Profile</Dropdown.Item>
                                    <Dropdown.Item>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <button type="button" class="icon-button">
                                <span className="material-icons">notifications</span>
                                <span className="icon-button__badge">2</span>
                            </button>
                        </div>
                    </Nav>

                </Navbar>
            </Container>
        </Navbar >
    )
}

export default NavBar
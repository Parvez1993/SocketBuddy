import React from 'react'
import { Button, Container, Dropdown, Image, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useChatStore } from '../Context/ChatProvider'
import { getSender } from '../utils/ChatLogics'
import Profile from './Profile'


function NavBar({ handleShow, user }) {
    const navigate = useNavigate()
    const { notifications } = useChatStore()
    const handleLogout = () => {
        localStorage.removeItem('userInfo')
        navigate('/')
    }

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
                                    <Image roundedCircle src={user?.pic} alt={user?.name} width="30px" id="dropdown-basic" />
                                </Dropdown.Toggle>


                                <Dropdown.Menu>
                                    <Dropdown.Item><Profile user={user} /></Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>


                            <Dropdown>

                                <Dropdown.Toggle variant="success" id="dropdown-basic1" style={{ background: "none", border: "none" }}>
                                    <button type="button" className="icon-button" id="dropdown-basic1">
                                        <span className="material-icons">notifications</span>
                                        <span className="icon-button__badge">{notifications.length > 0 ? notifications.length : "0"}</span>
                                    </button>
                                </Dropdown.Toggle>





                                {notifications.length > 0 ?
                                <Dropdown.Menu style={{ left: "-97px" }}>  {notifications?.map(notif=><Dropdown.Item>
                                    <Dropdown.Menu key={notif._id}>
                                        {notif.chat.isGroupChat ? `New message in ${notif.chat.chatName}`:`New message in ${getSender(user,notif.chat.users)})}`}
                                    </Dropdown.Menu>
                                </Dropdown.Item>)}</Dropdown.Menu>
                               
                                    : <Dropdown.Menu style={{ left: "-97px" }}><Dropdown.Item>No new notifications</Dropdown.Item>No new notification</Dropdown.Menu>}
                                    
                                    
                           
                            </Dropdown>
                        </div>
                    </Nav>

                </Navbar>
            </Container>
        </Navbar >
    )
}

export default NavBar
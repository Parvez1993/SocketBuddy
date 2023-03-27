import React, { useState } from 'react'
import { Card, Image, ListGroup, Offcanvas } from 'react-bootstrap'
import axios from 'axios'
import ChatLoading from './ChatLoading'
import { useChatStore } from '../Context/ChatProvider'
import { toast, ToastContainer } from 'react-toastify'

function SlidingSidebar({ show, handleClose, user }) {

    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()
    const { selectedChat, setSelectedChat, chats, setChats } = useChatStore("")




    const handleSearch = async (e) => {
        setLoading(true)
        const config = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`/api/users?search=${e.target.value}`, config)
        setSearchResults(data)
        setLoading(false)
    }


    const accessChat = async (userInfo) => {
        try {
            setLoadingChat(true)
            let userId = userInfo._id
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }

            const { data } = await axios.post("/api/chat", { userId }, config)

            if (!chats.find((c => c?._id === data?._id))) {
                setChats([...chats, data])
            }
            setSelectedChat(data)
            setLoadingChat(false)
            handleClose()
        } catch (error) {
            return toast.error(error.message, {
                position: toast.POSITION.TOP_LEFT
            });
        }

    }

    return (
        <>
            <Offcanvas style={{ display: "block" }} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Your Contacts</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
                    <div className='my-3'>
                        {loading ? <ChatLoading count={searchResults.length} /> : searchResults.length > 0 && searchResults.map((data, index) => {
                            return <Card key={index} style={{ display: "block" }} className='listItemz' onClick={() => accessChat(data)}>
                                <Card.Body>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Image src={data.pic} name={data.name} roundedCircle width="20" style={{ width: "10%" }} />
                                        <div>
                                            <h6>{data?.name}</h6>
                                            <h6>{data?.email}</h6>
                                        </div>

                                    </div>
                                </Card.Body>
                            </Card>

                        })}
                    </div>
                </Offcanvas.Body>
            </Offcanvas >
            <ToastContainer />
        </>
    )
}

export default SlidingSidebar
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, FloatingLabel, Form, Image, Modal, Row, ToastContainer } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useChatStore } from '../Context/ChatProvider'
import { getSender } from '../utils/ChatLogics'
import ChatLoading from './ChatLoading'

function MyChats() {

    const [loadingChat, setLoadingChat] = useState(true)
    const [loggedUser, setLoggedUser] = useState();
    const { fetchAgain, setFetchAgain, chats, setChats, user, selectedChat, setSelectedChat } = useChatStore("")
    const [groupnName, setGroupName] = useState("")
    const [users, setUsers] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    console.log("selectedChat", selectedChat)

    const fetchChats = async () => {
        try {
            setLoadingChat(true)
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }

            const { data } = await axios.get("api/chat", config)

            setChats(data)
            setLoadingChat(false)
        } catch (error) {
            return toast.error(error.message, {
                position: toast.POSITION.TOP_LEFT
            });

        }
        setLoadingChat(false)

    }

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line
    }, [fetchAgain]);


    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            return toast.error("user already exists", {
                position: toast.POSITION.TOP_LEFT
            });

        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const RemoveUser = (data) => {
        const removeUsers = selectedUsers.filter(e => e._id !== data._id)
        setSelectedUsers(removeUsers);

    }

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



    const handleSubmit = async () => {
        if (!groupnName && !selectedUsers) {
            return toast.error("Please fill all the fields", {
                position: toast.POSITION.TOP_LEFT
            });
        }
        else {
            try {
                setLoadingChat(true)
                const config = {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                }

                const { data } = await axios.post("api/chat/group", {
                    name: groupnName,
                    users: JSON.stringify(selectedUsers.map(e => e._id)),
                }, config)

                setChats([data, ...chats])
                setLoadingChat(false)
                toast.success("CHAT CREATED SUCCESSFULLY", {
                    position: toast.POSITION.TOP_LEFT
                });
                handleClose()
            } catch (error) {
                return toast.error(error.message, {
                    position: toast.POSITION.TOP_LEFT
                });

            }
            setLoadingChat(false)
        }
    }



    return (
        <>
            {loadingChat && "loading"}
            {!loadingChat && <div style={{ background: "white", height: "94vh", width: "30%" }}>
                <div className='d-flex justify-content-between my-3 p-3'>
                    <div>My Chats</div>
                    <Button variant="outline-primary" onClick={handleShow}>Create new Group</Button>
                </div>

                {chats?.map(chat => {
                    return <div key={chat._id} style={{ background: "pink", borderRadius: "10px" }} className="m-2 p-2 mychats" onClick={() => setSelectedChat(chat)}>
                        {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                    </div>
                })}
            </div>
            }
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style={{ display: "block" }}
            >
                <Modal.Header closeButton >
                    <Modal.Title>Create Group Chat</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: "block" }}>

                    <div className='d-flex wrap gap-2 my-2'>
                        {selectedUsers.map(data => {
                            return <div key={data._id} className="d-flex align-items-center justify-content-between" style={{ width: "15%", background: "#BFE45D", borderRadius: "15px", padding: "2px" }}>
                                <div>{data.name}</div>
                                <Image src="/img/cross.png" alt="cross" width={20} className="remove glyphicon glyphicon-white" onClick={() => RemoveUser(data)} />
                            </div>
                        })}
                    </div>
                    <FloatingLabel
                        controlId="floatingChatName"
                        label="Enter Group Name"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Enter Group Name" onChange={e => setGroupName(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingUsers" label="Add Users">
                        <Form.Control type="text" placeholder="text" onChange={handleSearch} />
                    </FloatingLabel>
                    <div className='my-3'>
                        {loading ? <ChatLoading count={searchResults.length} /> : searchResults.length > 0 && searchResults.map((data, index) => {
                            return <Card key={index} style={{ display: "block" }} className='listItemz my-1' onClick={() => handleGroup(data)}>
                                <Card.Body>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Image src={data.pic} name={data.name} roundedCircle style={{ width: "10%", height: "auto" }} />
                                        <div>
                                            <h6>{data?.name}</h6>
                                            <h6>{data?.email}</h6>
                                        </div>

                                    </div>
                                </Card.Body>
                            </Card>

                        })}

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>Create Group</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default MyChats
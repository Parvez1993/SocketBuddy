import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, FloatingLabel, Form, Image, Modal } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { useChatStore } from '../Context/ChatProvider'
import { getSender, getSenderFull } from '../utils/ChatLogics'
import ChatLoading from './ChatLoading'
import Profile from './Profile'

function SingleChat() {
    const { selectedChat, fetchAgain, setFetchAgain, user, setSelectedChat } = useChatStore()
    const [show, setShow] = useState(false);
    const [groupName, setGroupName] = useState("")
    const [users, setUsers] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([]);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    const handleGroup = async (userToAdd) => {
        if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
            return toast.error("User Already in group!", {
                position: toast.POSITION.TOP_LEFT
            });

        }
        if (selectedChat.groupAdmin._id !== user._id) {
            return toast.error("Only admins can add someone", {
                position: toast.POSITION.TOP_LEFT
            });

        }


        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `/api/chat/groupadd`,
                {
                    chatId: selectedChat._id,
                    userId: userToAdd._id,
                },
                config
            );

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_LEFT
            });
            setLoading(false);
        }
        setGroupName("");
    };

    const RemoveUser = async (userData) => {
        if (selectedChat.groupAdmin._id !== user._id && userData._id !== user._id) {
            return toast.error("Only admins can remove someone", {
                position: toast.POSITION.TOP_LEFT
            });
        }


        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `/api/chat/remveFromGroup`,
                {
                    chatId: selectedChat._id,
                    userId: userData._id,
                },
                config
            );

            userData._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_LEFT
            });
            setLoading(false);

        }

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

    const rennameGroup = async () => {
        if (!groupName) return;

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `/api/chat/rename`,
                {
                    chatId: selectedChat._id,
                    chatName: groupName,
                },
                config
            );

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast.error("user already exists", {
                position: toast.POSITION.TOP_LEFT
            });
            setLoading(false);
        }
        setGroupName("");
        handleClose()
    };

    return (
        <div style={{ background: "pink", width: "69%" }}>
            {!selectedChat && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>Click on someone to chat with</div>}
            {selectedChat.isGroupChat && <div>
                <div className='bg-white p-3 d-flex justify-content-between'>
                    <h2>{selectedChat.chatName}</h2>
                    <div>
                        <Button variant="danger" onClick={() => setSelectedChat("")}>X</Button>
                        <Button variant="secondary" onClick={() => handleShow()}>Options</Button>
                    </div>
                </div>
            </div>}
            {selectedChat && !selectedChat.isGroupChat && <div>
                <div className='bg-white p-3 d-flex justify-content-between'>
                    {getSender(user, selectedChat?.users)}
                    <Button variant="danger"><Profile user={getSenderFull(user, selectedChat?.users)} /></Button>
                </div>
            </div>}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style={{ display: "block" }}
            >
                <Modal.Header closeButton >
                    <Modal.Title>Update Group Chat</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: "block" }}>

                    <div className='d-flex wrap gap-2 my-2'>
                        {selectedChat?.users?.map(data => {
                            return <div key={data._id} className="d-flex align-items-center justify-content-between" style={{ width: "15%", background: "#BFE45D", borderRadius: "15px", padding: "2px" }}>
                                <div>{data.name}</div>
                                <Image src="/img/cross.png" alt="cross" width={20} className="remove glyphicon glyphicon-white" onClick={() => RemoveUser(data)} />
                            </div>
                        })}
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div>
                            <FloatingLabel
                                controlId="floatingChatName"
                                label="Enter Group Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Enter Group Name" value={groupName ? groupName : selectedChat?.chatName} onChange={e => setGroupName(e.target.value)} />
                            </FloatingLabel>
                        </div>
                        <Button variant="primary" onClick={() => rennameGroup()}>Rename</Button>
                    </div>
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
            </Modal>
            <ToastContainer />
            {loading && <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>}
        </div>
    )
}

export default SingleChat
import React, { useState } from 'react'
import ChatBox from '../Components/ChatBox';
import MyChats from '../Components/MyChats';
import NavBar from '../Components/NavBar';
import SlidingSidebar from '../Components/SlidingSidebar';
import { useChatStore } from '../Context/ChatProvider'

function ChatPage() {
  const { user } = useChatStore()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <div style={{ width: "100%" }}>
      <NavBar handleShow={handleShow} user={user} />
      {user && <SlidingSidebar show={show} handleClose={handleClose} user={user} />}
      <div className='d-flex justify-content-between bg-danger' style={{ height: "94vh" }}>
        {user && <MyChats />}
        {user && <ChatBox />}
      </div>
    </div>
  )
}

export default ChatPage
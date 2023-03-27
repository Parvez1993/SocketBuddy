import React, { useState } from 'react'
import ChatBox from '../components/ChatBox';
import MyChats from '../components/MyChats';
import NavBar from '../components/NavBar';
import SlidingSidebar from '../components/SlidingSidebar';
import { useChatStore } from '../Context/ChatProvider';


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
import React, { useState } from 'react'
import SlidingSidebar from '../Components/SlidingSidebar';
import { useChatStore } from '../Context/ChatProvider'

function ChatPage() {
  const { user } = useChatStore()

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ width: "100%" }}>
      {user && <SlidingSidebar show={show} handleClose={handleClose} handleShow={handleShow} />}
    </div>
  )
}

export default ChatPage
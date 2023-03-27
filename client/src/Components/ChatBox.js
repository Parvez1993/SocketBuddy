import React from 'react'
import { useChatStore } from '../Context/ChatProvider'
import SingleChat from './SingleChat'

function ChatBox() {
    const { selectedChat, fetchAgain, setFetchAgain, } = useChatStore()
    return (
        <SingleChat />
    )
}

export default ChatBox
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ChatLoading({ count }) {
    return (
        <Skeleton count={count} />
    )
}

export default ChatLoading
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    let [user, setUser] = useState("")
    const [selectedChat, setSelectedChat] = useState("")
    const [chats, setChats] = useState("")
    const [fetchAgain, setFetchAgain] = useState(false)
    const [notifications, setNotifications] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo)

        if (!userInfo) {
            navigate("/")
        }
    }, [navigate])


    let value = {
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        fetchAgain, 
        setFetchAgain,
        notifications, 
        setNotifications
    }
    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChatStore() {
    return useContext(ChatContext);
}
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    let [user, setUser] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(JSON.stringify("userInfo"))
        setUser(userInfo)

        if (!userInfo) {
            navigate("/")
        }
    }, [])


    let value = {
        user,
        setUser
    }
    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChatStore() {
    return useContext(ChatContext);
}
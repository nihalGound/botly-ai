"use client"

import { createContext, useContext, useState } from "react"

type ChatInitialValuesProps = {
    realtime: boolean
    setRealtime: React.Dispatch<React.SetStateAction<boolean>>
    chatRoom: string | undefined
    setChatRoom: React.Dispatch<React.SetStateAction<string | undefined>>
    chats: {
        message: string
        id: string
        role: 'assistant' | 'user' | null
        createdAt: Date
        seen: boolean
    }[]
    setChats: React.Dispatch<
        React.SetStateAction<
            {
                message: string
                id: string
                role: 'assistant' | 'user' | null
                createdAt: Date
                seen: boolean
            }[]
        >
    >
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatInitalValues: ChatInitialValuesProps = {
    chatRoom: undefined,
    setChatRoom: () => undefined,
    chats: [],
    setChats: () => undefined,
    loading: false,
    setLoading: () => undefined,
    realtime: false,
    setRealtime: () => undefined,
}

const chatContext = createContext(ChatInitalValues)
const { Provider } = chatContext;

export const ChatProvider = ({children}:{children: React.ReactNode}) => {
    const [chats,setChats] = useState(ChatInitalValues.chats)
    const [loading,setLoading] = useState(ChatInitalValues.loading)
    const [chatRoom,setChatRoom] = useState(ChatInitalValues.chatRoom)
    const [realtime,setRealtime] = useState(ChatInitalValues.realtime)

    const values = {
        chats,
        setChats,
        loading,
        setLoading,
        chatRoom,
        setChatRoom,
        realtime,
        setRealtime,
    }

    return <Provider value={values}>{children}</Provider>
}

export const useChatContext = () => {
    const state = useContext(chatContext);
    return state
}
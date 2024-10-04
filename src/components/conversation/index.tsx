"use client"
import { useConversation } from '@/hooks/conversation/use-conversation'
import React from 'react'
import TabsMenu from '../tabs'
import { TAB_MENU } from '@/constants/menu'
import { TabsContent } from '../ui/tabs'
import ConversationnSearch from './conversation-search'
import { Loader } from '../loader'
import ChatCard from './chat-card'
import { CardDescription } from '../ui/card'
import { Separator } from '../ui/separator'

type Props = {
    domains?: 
    | {
        name: string
        id: string
        icon: string
    }[]
    | undefined
}

const ConversationMenu = ({domains}: Props) => {
  const {register, chatRooms, loading, onGetActiveChatMessages} = useConversation();
  console.log("chatRooms: ",chatRooms);
  return (
    <div className="py-3 px-0">
      <TabsMenu triggers={TAB_MENU}>
        <TabsContent value="unread">
            <ConversationnSearch
              register={register}
              domains={domains}
            />
            <div className="flex flex-col">
              <Loader loading={loading}>
                {chatRooms.length ? (
                  chatRooms.map((room)=> (
                    <ChatCard
                      seen = {room.chatRoom[0].message[0]?.seen}
                      id={room.chatRoom[0].id}
                      onChat={()=> onGetActiveChatMessages(room.chatRoom[0].id)}
                      createdAt={room.chatRoom[0].message[0]?.createdAt}
                      key={room.chatRoom[0].id}
                      title={room.email!}
                      description={room.chatRoom[0].message[0]?.message}
                    />
                  ))
                ):(
                  <CardDescription>
                    No chats for your domain
                  </CardDescription>
                )}
              </Loader>
            </div>
        </TabsContent>
        <TabsContent value="all">
            <Separator
              orientation="horizontal"
              className="mt-5"
            />
            all
        </TabsContent>
        {/* create tab content for other tabs all, expired,starred */}
      </TabsMenu>
    </div>
  )
}

export default ConversationMenu
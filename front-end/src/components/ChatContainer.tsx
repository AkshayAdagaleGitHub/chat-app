import {useChatStore} from "../store/useChatStore.ts";
import {useEffect} from "react";
import {ChatHeader} from "./ChatHeader.tsx";
import {MessageInput} from "./MessageInput.tsx";

export const ChatContainer = () =>{

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();

    useEffect(()=>{
        getMessages(selectedUser.id);
    },[selectedUser.id, getMessages])

    if(isMessagesLoading){
        return <div>Loading...</div>
    }

    return (
        <div className="flex-1 flex flex-col overflow-y-auto">
            <ChatHeader/>
            <p>messages...</p>
            <MessageInput />
        </div>
    );
}
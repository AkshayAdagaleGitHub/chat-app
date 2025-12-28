import {useChatStore} from "../store/useChatStore.ts";
import {useEffect} from "react";
import {ChatHeader} from "./ChatHeader.tsx";
import {MessageInput} from "./MessageInput.tsx";
import {Loader} from "lucide-react";
import {useAuthStore} from "../store/useAuthStore.ts";
import {formatDate} from "../lib/util.ts";

export const ChatContainer = () => {
   const {
       messages,
       getMessages,
       isMessageLoading,
       selectedUser,
       subscribeToNewMessages,
       unsubscribeFromMessages
   } = useChatStore()
    const { authUser } = useAuthStore();

    useEffect( () => {

        if(selectedUser){
            console.log("selectedUser", selectedUser);
            console.log("authUser", authUser);
            getMessages({
                fromUserId: authUser?.id,
                toUserId: selectedUser.id,
                messageText: ""
            }).then(r =>{
                console.log("messages", r);
            })
            subscribeToNewMessages();
        }
        return () => {
            unsubscribeFromMessages();
        }
    },[selectedUser, getMessages, subscribeToNewMessages, unsubscribeFromMessages])

    if(isMessageLoading){
        return (
            <div className={"flex justify-center items-center h-screen w-screen"} style={{backgroundColor: "white"}}>
                <ChatHeader />
                <Loader className={"size-10 animate-spin"} color={"black"} size={"24px"}/>
                <MessageInput/>
            </div> );
    }

    return (
        <div className="flex-1 flex flex-col overflow-y-auto">
            <ChatHeader />
            {/*<p>Messages...</p>*/}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {messages.map((message) => (
                    console.log("message", message),
                    <div
                        key={message.createdAt}
                         // className={`chat  ${message.fromUserId === authUser?.id ? "chat-end" : "chat-start"}`}>
                         className={`chat ${message.fromUserId === authUser?.id ? "chat-end" : "chat-start" }`}>

                        <div className={"chat-image avatar"}>
                            <div className={"w-10 h-10 rounded-full border-2 "}>
                                <img
                                    src={message.fromUserId === authUser?.id ? authUser?.profilePic : selectedUser?.profilePic || "/avatar.png"}
                                    alt={"profile pic of user " + (message.fromUserId === authUser?.id ? authUser?.fullName : selectedUser?.fullName || "Unknown User")}
                                    className={"w-10 h-10 rounded-full"}/>
                                <br/>
                            </div>
                            <div className={"chat-header mb-1"}>
                                <time className={"text-xs text-gray-400 ml-1"}>{message.createdAt !== undefined
                                    ? formatDate(message.createdAt) : ""} </time>
                            </div>
                                {/*<span>{message.fullName}</span>*/}
                        </div>
                        <div className={"chat-bubble"}>
                                {message.messageText}
                        </div>
                    </div>

                ))}
            </div>
            <MessageInput/>
        </div>
    )
}
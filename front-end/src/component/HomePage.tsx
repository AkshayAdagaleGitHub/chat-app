import {useChatStore} from "../store/useChatStore.ts";
import { ChatContainer } from "./ChatContainer.tsx";
import {Sidebar} from "./Sidebar.tsx";
import {NoChatSelected} from "./NoChatSelected.tsx";
import {useEffect} from "react";

const HomePage = () => {
    const jwt = localStorage.getItem('jwt');
    const { selectedUser, updateOnlineStatus } = useChatStore();
    console.log('selectedUser', selectedUser);

    // useEffect(()=>{
    //     if(jwt){
    //         updateOnlineStatus();
    //     };
    // })
    return (
        <div className="h-screen bg-base-200">
            <div className="flex items-center justify-center pt-20 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                     <Sidebar />
                        { !selectedUser ? <NoChatSelected/> : <ChatContainer />}
                    </div>
                </div>
            </div>

        </div>
    );
};
export default HomePage;
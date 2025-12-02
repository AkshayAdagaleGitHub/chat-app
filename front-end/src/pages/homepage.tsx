import { useChatStore } from "../store/useChatStore";
import {Sidebar} from "../components/Sidebar.tsx";
import {NoChatSelected} from "../components/NoChatSelected.tsx";
import {ChatContainer} from "../components/ChatContainer.tsx";

export const Homepage = () => {

    const { selectedUser } = useChatStore();

    return (
        <div className="h-screen bg-base-200">
            <div className="flex justify-center items-center pt-20 px-4">
                <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md h-[calc(100vh-20rem)] p-[4rem]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar/>
                        {!selectedUser ? <NoChatSelected/>
                            : <ChatContainer selectedUser={selectedUser} />}
                    </div>
                </div>
            </div>
            Homepage
        </div>
    );
};
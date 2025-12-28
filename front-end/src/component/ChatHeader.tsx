import {useChatStore} from "../store/useChatStore.ts";
// import {useAuthStore} from "../store/useAuthStore.ts";

export const ChatHeader = () => {
    const {selectedUser} = useChatStore();
    // const {onlineUsers} = useAuthStore();

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className={"flex items-center justify-between"}>
                    <div className={"flex items-center gap-3"}>
                        <div className={"avatar"}>
                            <img src={selectedUser?.profilePic || "./avatar.png"} alt={selectedUser?.fullName}
                                 className={"w-10 h-10 rounded-full"}/>
                        </div>
                    <h1 className={"text-xl font-bold"}>{selectedUser?.fullName}</h1>
                </div>
            </div>
        </div>
    )
}
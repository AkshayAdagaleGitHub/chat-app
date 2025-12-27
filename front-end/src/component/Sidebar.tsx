import { useEffect } from "react";
import {useChatStore} from "../store/useChatStore.ts";
import {Users} from "lucide-react";
import type {User} from "../type/type.ts";
// import {useAuthStore} from "../store/useAuthStore.ts";

export const Sidebar = () => {

  const {getUsers, users, setSelectedUser, isUsersLoading } = useChatStore()

    // const { onlineUsers } = useAuthStore()

    useEffect(() => {
        getUsers();
    },[getUsers])

    if(isUsersLoading){
        return <div>Loading...</div>
    }

    return (
            <aside className={"w-[21%] h-full lg:w-72 bg-base-100 transition-all flex flex-col duration-200"} style={{overflowY: "scroll"}}>
                <div className={"border-b border-base-300 p-4 gap-2"}>
                    <div className={"flex items-center gap-2"}>
                        <Users/>
                        <span className={"text-xl font-bold"}>Users</span>
                    </div>
                </div>
                <div className={"flex flex-col gap-2"}>
                    {users.map((user: User) => (
                        <button
                            className={"flex items-center gap-2 p-2 cursor-pointer hover:bg-base-200"}
                            key={user.id}
                            onClick={() => setSelectedUser(user)}>
                            <img src={user.profilePic} alt={user.fullName} className={"w-10 h-10 rounded-full"}/>
                            <span>{user.email}</span>
                        </button>
                    ))}
                </div>
            </aside>
    )
}
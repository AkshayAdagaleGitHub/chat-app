import {useRef, useState} from "react";
import {useChatStore} from "../store/useChatStore.ts";
import {X} from "lucide-react";
import type {ChatUser, User} from "../type/type.ts";

export const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        setFiles(e.target.files);
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        if( text.trim().length === 0) return;
        try {
            sendMessage({
                messageText : text.trim(),
                createdAt : Date.now().toString(),
            });
            setText("");
        }catch(e){
            console.error(e);
        }
    }

    return (
        <div className={"p-4 w-full"}>
            <div className={"mb-3 flex items-center gap-2"}>
                { imagePreview
                    ? <>
                        <img src={imagePreview} alt=""/>
                        <button onClick={handleImageChange}>
                            <X className={"size-5"}/>
                        </button>
                    </>
                    : ""
            }
            </div>
            <br/>
            <form  className={"flex items-center gap-2"} onSubmit={handleSendMessage}>
                {/*<input type="file" onChange={handleImageChange} ref={fileInputRef}/>*/}
                <div className={"flex-1 flex items-center gap-2 border border-base-300 rounded-lg p-2"}>
                    <input type="text"
                           value={text}
                           className={"w-full input bg-transparent input-bordered rounded-lg sm:input-md"}
                           placeholder={"Type a message"}
                           onChange={(e) => setText(e.target.value)}
                    />
                    <button type={"submit"}>Send</button>
                </div>
            </form>
            <br/>

        </div>
    )
}
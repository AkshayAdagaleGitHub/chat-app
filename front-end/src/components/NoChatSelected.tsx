import { MessagesSquare } from "lucide-react";

export const NoChatSelected = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="max-w-md text-center space-y-6">
                <div className="relative">
                    <div className="w-16
                    H-16 rounded-2xl bg-primary/10 flex items-center
                    justify-center animate-bounce">
                        <MessagesSquare className="w-8 h-8 text-primary"/>
                    </div>
                </div>
            </div>
            <h2 className="text-xl font-medium">
                Select a user to start chatting
            </h2>
            <p className="text-sm text-gray-500">
                Select a user from the sidebar to start chatting
            </p>
        </div>
    );
}
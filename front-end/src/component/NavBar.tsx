import {useAuthStore} from "../store/useAuthStore.ts";
import {MessagesSquare, Settings} from "lucide-react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const NavBar = () => {
    const{ logout, authUser} = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const handleProfileClick = () => {
        navigate('/profile-page');
    }

    return(
        <header
         className="bg-base-100
         border-b border-base-300
         fixed
         w-full
         top-0
         z-40
         left-0
         right-0
         backdrop-blur-lg
         bg-base-100/80"
        >
            <div className="container
            mx-auto
            flex justify-between items-center
            gap-8
            h-16">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex item-center gap-2.5 hover:opacity-80 transition-all">
                        <div className="size-9
                        rounded-lg bg-primary/25 flext
                        flex items-center justify-center
                        font-bold
                        ">
                            <MessagesSquare className="size-7 text-primary"/>
                        </div>
                        <h1 className="text-xl font-bold">Chat App</h1>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    { authUser &&
                        <div className="text-sm font-medium">
                            {authUser.fullName}
                        <Link to="/profile-page" className="hover:opacity-80 transition-all"></Link>
                        </div>
                    }
                    { authUser && <button onClick={handleProfileClick} className="btn btn-sm gap-2 transition-colors hover:opacity-80 transition-all">Profile</button>}
                    { authUser && <button onClick={handleLogout} className="btn btn-sm gap-2 transition-colors hover:opacity-80 transition-all">Logout</button>}
                    { !authUser && <Link to="/login" className="btn btn-sm gap-2 transition-colors hover:opacity-80 transition-all">Login</Link>}
                    { !authUser && <Link to="/signup" className="btn btn-sm gap-2 transition-colors hover:opacity-80 transition-all">Sign Up</Link>}
                    <Link to="/setting-page"
                          className="
                        btn btn-sm gap-2 transition-colors
                          hover:opacity-80
                          transition-all"
                    >
                        <Settings className="size-5"/>
                    </Link>
                </div>
            </div>
        </header>
    );
}
export default NavBar;
import {Navbar} from "./components/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import {Homepage} from "./pages/homepage.tsx";
import {Login} from "./pages/Login.tsx";
import {Signup} from "./pages/Signup.tsx";
import {Profile} from "./pages/profile.tsx";
import {useAuthStore} from "./store/useAuthStore";
import {useEffect} from "react";
import {Loader} from "lucide-react";

const App = () => {
    const {checkAuth, authUser, isCheckingAuth } = useAuthStore();

    useEffect(()=>{
        checkAuth();
    },[checkAuth]);

    if(isCheckingAuth && !authUser){
        <div className="flex justify-center items-center h-screen">
            <Loader className="size-10 animate-spin"/>
        </div>
    }

    console.log(authUser);

    return (
        <div className="text-red-500">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="*" element={<div>404</div>}/>
            </Routes>
        </div>
    )
}
export default App;
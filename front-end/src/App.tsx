import NavBar from "./component/NavBar";
import {Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./component/HomePage";
import SignUpPage from "./component/SignUpPage";
import LoginPage from "./component/LoginPage";
import SettingPage from "./component/SettingPage";
import ProfilePage from "./component/ProfilePage";
import {useAuthStore} from "../src/store/useAuthStore.ts";
import {useEffect} from "react";
import {Loader} from "lucide-react";

const App = ()=>  {

    const checkAuth = useAuthStore((state) => state.checkAuth);
    const authUser = useAuthStore((state) => state.authUser);
    const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth)

    useEffect(() => {
        console.log('checking auth in App.tsx');
        console.log('checking auth in App.tsx');
        console.log("isCheckingAuth", isCheckingAuth);
        console.log("authUser", authUser);
        checkAuth().then((r) => {
            console.log("Inside useEffect isCheckingAuth", isCheckingAuth);
            console.log("r ", r);
        });
    },[checkAuth])

    if(isCheckingAuth && !authUser){

        return (
            <div className="flex justify-center items-center h-screen w-screen">
                <Loader className="size-10 animate-spin" color="white" size={"24px"}/>
            </div>
        )
    }
    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path="/" element={ authUser ? <HomePage/> : <SignUpPage/>}/>
                <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/"/>}/>
                <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
                <Route path="/settings-page" element={authUser ? <SettingPage/> : <LoginPage/>}/>
                <Route path="/profile-page" element={authUser ? <ProfilePage/> : <LoginPage/>}/>
            </Routes>
        </div>
    )
}
export default App;

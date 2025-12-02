import {useAuthStore} from "../store/useAuthStore.ts";
import {useState} from "react";
import {EyeClosed, EyeOff} from "lucide-react";
import toast from "react-hot-toast";

export const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {signup, isSigningUp} = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    console.log(showPassword);
    const validateForm = (): boolean =>{
        let validate = true;
        if(formData.name === undefined || formData.name.trim().length === 0){
            validate = false;
            toast.error('Name is required');
        }
        if(formData.email === undefined || formData.email.trim().length === 0){
            validate = false;
            toast.error('Email is required');
        }
        if(formData.password === undefined || formData.password.trim().length === 0){
            validate = false;
            toast.error('Password is required');
        }
        return validate;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm()){
            signup(formData);
        }
    }

    return (
        <div className="mn-h-screen grid lg:grid-cols-2">
            <div
                className="flex flex-col justify-center
                items-center bg-primary p-6 sm:p-12
                rounded-lg shadow-2xl
                w-full max-w-md
                lg:col-span-1
                text-center
                text-white
                bg-gradient-to-br from-primary-500 to-primary-600
                dark:from-primary-700 dark:to-primary-800
                dark:text-white
                dark:bg-gradient-to-br
                dark:border-gray-700
                border border-gray-200
                dark:border-gray-800
                mb-12
                shadow-xl
                rounded-3xl
                relative
                z-10
                overflow-hidden
                backdrop-filter backdrop-blur-sm
                border-primary-500
                border-opacity-25
                animate-pulse
                duration-300
                {/*ease-in-out*/}
                transform hover:-translate-y-1 hover:scale-105
                transition-all duration-500"
            >
                <div
                    className="w-full max-w-md "
                >
                    Sign Up
                </div>
            </div>
            <form onSubmit={handleSubmit}
                  className="space-y-6
                  p-6
                  bg-base-100
                  rounded-lg
                  shadow-xl
                  w-full
                  max-w-md
                  lg:col-span-1
                  flex flex-col justify-center">

                <input
                    type="text"
                    placeholder="fullname"
                    value={formData.name}
                    className="mb-3 input input-primary input-bordered w-full"
                       onChange={(e) => {
                           setFormData({...formData, name: e.target.value})}}
                />
                <input type="email" placeholder="email"
                       className="mb-3 input input-primary input-bordered w-full"
                       onChange={(e) => {
                           setFormData({...formData, email: e.target.value})}}
                />
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="password"
                    className="mb-3 input input-primary input-bordered w-full"
                    value={formData.password}
                    onChange={(e) => {
                           setFormData({...formData, password: e.target.value})}
                }/>
                <button type="button"
                        value="showPassword"
                       onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ?
                <EyeOff />
                : <EyeClosed />}
                </button>
                    <button
                        className="mb-3 btn btn-primary"
                        type="submit"
                        disabled={isSigningUp}
                    >
                        { isSigningUp && <div className="spinner"/>}
                        Signup
                    </button>
            </form>
            <p className="text-center text-sm text-gray-500">
                Already have an account?
                <a href="/login" className="text-primary">Login</a>
            </p>
        </div>
    );
}
import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore.ts";

import {Eye, EyeClosed, Lock, Mail, MessagesSquare, User} from "lucide-react";
import toast from "react-hot-toast";

const SignUpPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const {signsUp} = useAuthStore();

    const validateForm = () : boolean => {
        if(!formData.fullName || !formData.email || !formData.password){
            console.log('form is invalid');
            toast.error('Please fill all the fields');
            return false;
        }
        return true;
    }

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const success = validateForm();
        if(success) {
            signsUp(formData);
            setFormData({fullName: '', email: '', password: ''})
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="text-4xl font-bold">
                                <MessagesSquare className="size-6 text-primary"/>
                            </div>
                            <div className="text-xl font-medium">Chat App</div>
                            <div className="text-sm text-gray-500">Sign up to start chatting</div>
                        </div>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="text-sm text-gray-500">
                            Full Name
                        </div>
                        <div className="relative">
                        <div className=" absolute text-sm inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User/>
                        </div>
                        <input type="text"
                               placeholder="Full Name"
                               className=" input w-full
                               px-4
                               py-3
                               pl-10
                               rounded-md
                               border
                               border-gray-300
                               focus:outline-none
                               focus:ring
                               focus:ring-primary
                               focus:border-primary"
                               name="fullName"
                               required
                               value={formData.fullName}
                               onChange={handleChange}
                        />
                        </div>
                        <div className="relative">
                            <div className=" absolute text-sm inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="size-5"/>
                            </div>
                        <input type="email"
                               placeholder="Email"
                               name="email"
                               value={formData.email}
                               required
                               onChange={handleChange}
                               className="w-full
                               px-4
                               py-3
                               pl-10
                               rounded-md
                               border
                               border-gray-300
                               focus:outline-none
                               focus:ring
                               focus:ring-primary
                               focus:border-primary"/>
                            </div>
                        <div className="relative">
                            <div className=" absolute text-sm inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="size-5"/>
                            </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            required
                            onChange={handleChange}
                            className="w-full
                            px-4
                            py-3
                            pl-10
                            rounded-md
                            border
                            border-gray-300
                            focus:outline-none
                            focus:ring
                            focus:ring-primary
                            focus:border-primary"/>
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                {showPassword ? <EyeClosed className="size-5"/> : <Eye className="size-5 rotate-180"/>}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full
                            px-4
                            py-3
                            bg-primary
                            text-white
                            rounded-md
                            hover:bg-primary-dark
                            focus:outline-none
                            focus:ring
                            focus:ring-primary
                            focus:ring-offset-1">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 bg-primary-light">
                <div className="
                pb-12
                px-12
                py-32
                pl-3
                ">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" alt=""/>
                </div>
            </div>

        </div>
    );
};
export default SignUpPage;
import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore.ts";
import {Eye, EyeClosed, Lock, Mail, MessagesSquare} from "lucide-react";
import toast from "react-hot-toast";


const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const {login} = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const validateForm = () : boolean => {
        if(!formData.email || !formData.password){
            console.log('form is invalid');
            toast.error('Please fill all the fields');
            return false;
        }
        return true;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const success = validateForm();
        if(!success) return;
        login(formData);
        setFormData({email: '', password: ''})
    }
    return (
        <div className="min-h-screen grid">
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8
                bordered
                bg-white
                p-8
                rounded-lg
                shadow-md
                sm:w-96
                sm:mx-auto
                sm:space-y-5
                sm:p-5
                sm:shadow-lg
                sm:border
                sm:border-gray-200
                sm:rounded-2xl
                sm:overflow-hidden
                sm:-mt-16
                sm:flex sm:flex-col
                sm:justify-between
                sm:items-center
                sm:gap-3
                sm:-mb-16
                sm:py-10
                sm:shadow-none
                sm:border-none
                ">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="text-4xl font-bold">
                                <MessagesSquare className="size-6 text-primary"/>
                            </div>
                            <div className="text-xl font-medium">Welcome</div>
                            <div className="text-sm text-gray-500">Login to start chatting</div>
                        </div>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <label className="text-sm text-gray-500">
                            Email
                        </label>
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
                            <label className="text-sm text-gray-500">
                                Password
                            </label>
                            <div className="absolute text-sm top-5 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                            top-5
                            rounded-md
                            border
                            border-gray-300
                            focus:outline-none
                            focus:ring
                            focus:ring-primary
                            focus:border-primary"/>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-6 inset-y-0 right-0 pr-3 flex items-center">
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
        </div>
    );
};
export default LoginPage;
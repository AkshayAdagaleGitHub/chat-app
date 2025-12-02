import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore.ts";

export const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {login, isLoggingIn} = useAuthStore();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        login(formData);
        setFormData({email: '', password: ''});
        setShowPassword(false);

    }

    return (
       <form onSubmit={handleSubmit}>
           <input type="email" placeholder="email"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}/>
           <input type={showPassword ? 'text' : 'password'} placeholder="password"
                  onChange={(e) => setFormData({...formData, password: e.target.value})} />
           <button type="submit">Login</button>
       </form>
    );
}
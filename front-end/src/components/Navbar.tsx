import {useAuthStore} from "../store/useAuthStore.ts";

export const Navbar = () => {
    // const user = localStorage.getItem('user');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { logout, authUser } = useAuthStore();


    return (
        <header>
            <div className="container mx-auto px-6 h-16 flex items-center">
                <h1 className="text-2xl">Chat App</h1>
            </div>
            <div>
                {!authUser && <a href="/login">
                    Login
                </a>}
                {authUser && <button onClick={logout}>
                    Logout
                </button>}
            </div>
        </header>
    );
}
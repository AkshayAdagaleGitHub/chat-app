export interface User {
    id: number;
    fullName: string;
    email: string;
    profilePic: string;
}

export interface AuthState {
    authUser: User | null;
    isCheckingAuth: boolean;
    isLoggingIn: boolean;
    isLoggingOut: boolean;
    isRegistering: boolean;
    isUpdatingProfile: boolean;
    isSigningUp: boolean;
    signsUp: (data: SignUpFormData) => Promise<void>;
    checkAuth: () => Promise<void>;
}
export interface SignUpFormData {
    fullName: string;
    email: string;
    password: string;
}
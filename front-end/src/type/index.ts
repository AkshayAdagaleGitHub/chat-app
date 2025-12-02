export interface User {
    id: number;
    name: string;
    email: string;
    profilePic: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    password: string;
    isOnline: boolean;
    lastSeen: Date;
    status: string;
    role: string;
}
import { User } from "./user.interface";

export interface ApiUser
{
    results: [
        {
            users: User[]
        }
    ];
}
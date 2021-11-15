import { User } from "../../models/user.interface";
import { UserActions, UserActionTypes } from "./user.action";

export interface UserState {
    user: User[];
    loading: boolean;
    error: string;
}

const initialState: UserState = {
    user: [],
    loading: false,
    error: ''
}

export function UserReducer(state: UserState = initialState, action: UserActions): UserState
{
    switch (action.type)
    {
        case UserActionTypes.GET_USERS:
            return { ...state, loading: true}
        case UserActionTypes.GET_USERS_SUCCESS:
            return { ...state, user: action.payload, loading: false}
        case UserActionTypes.GET_USERS_FAIL:
            return {...state, loading: false, error: action.payload}
        case UserActionTypes.CREATE_USER:
            return {...state, user: [...state.user, action.payload]}
        case UserActionTypes.DELETE_USER:
            return {...state, user: state.user.filter((user, index) => index !== action.payload)}
        case UserActionTypes.UPDATE_USER:
            return {...state, user: state.user.map((user, index) => index === action.payload.index ? action.payload.user : user)}
        default:
            return state;
    }
}
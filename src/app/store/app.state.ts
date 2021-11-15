import { ActionReducerMap } from "@ngrx/store";
import { UserReducer, UserState } from "./user/user.reducer";

export interface AppState {
    readonly users: UserState;
}

export const reducers: ActionReducerMap<AppState, any> = {
    users: UserReducer
}
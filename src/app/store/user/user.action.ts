import { Action } from "@ngrx/store";
import { User } from "src/app/models/user.interface";

export enum UserActionTypes {
    GET_USERS = '[User] Get User',
    GET_USERS_SUCCESS = '[User] Get User Success',
    GET_USERS_FAIL = '[User] Get User Fail',
    CREATE_USER = '[User] Create User',
    UPDATE_USER = '[User] Update User',
    DELETE_USER = '[User] Delete User',
}

export class GetUsers implements Action {
    readonly type = UserActionTypes.GET_USERS;
    constructor() { }
}

export class GetUsersSuccess implements Action {
    readonly type = UserActionTypes.GET_USERS_SUCCESS;
    constructor(public payload: User[]) { }
}

export class GetUsersFail implements Action {
    readonly type = UserActionTypes.GET_USERS_FAIL;
    constructor(public payload: string) { }
}

export class CreateUser implements Action {
    readonly type = UserActionTypes.CREATE_USER;
    constructor(public payload: User) { }
}

export class UpdateUser implements Action {
    readonly type = UserActionTypes.UPDATE_USER;
    constructor(public payload: {
        index: number,
        user: User
    }) { }
}

export class DeleteUser implements Action {
    readonly type = UserActionTypes.DELETE_USER;
    constructor(public payload: number) { }
}

export type UserActions = GetUsers | GetUsersSuccess | GetUsersFail | CreateUser | UpdateUser | DeleteUser;
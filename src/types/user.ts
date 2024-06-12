import { PagedDataRequest } from "./global"

export type UserSearchContextType = {
    userListRequest:{
        userListRequest:UserListRequest,
        setUserListRequest: (userListRequest:UserListRequest) => void
    }
}

export type UserLogin = {
    email:string,
    password:string
}

export type UserInsertForm = {


}
 
export type UserInsertRequest = {


}

export interface UserListRequest extends PagedDataRequest   {
    nome?:string
}

export type UserList  = {

    items:UserListResponse[]
}

export type UserListResponse = {

    id?: string,
    nome?: string,
    email?: string,
    cpf?: string

}

type Claim  = {
    value:string
    type:string
}

type UserToken = {
    id: number,
    email: string,
    claims:Claim[],
    name:string 
}

export type UserSignUp  = {
    accessToken:string
    expiresIn:number
    userToken:UserToken
    refreshToken:string
}
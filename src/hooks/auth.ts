import apiUser from "../services/user";
import { UserList, UserListRequest, UserListResponse, UserLogin, UserSignUp } from "../types/user"

import { setAuthStatus, setUserAuth } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { AES, enc } from "crypto-js";
import { ApiResponse, PagedDataResponse } from "../types/global";
import {UserLoggedLocalStorage} from '../util/utilFunctions'

export const useAuth = () => {

    const storageKey = import.meta.env.VITE_STORAGE_KEY
    const secretKey = import.meta.env.VITE_SECRET_KEY

    const dispatch = useAppDispatch()
    const { loginAsync, listUsersAsync } = apiUser();
    const userLogged = useAppSelector(state => state.auth)


    const getUserNameLogged = () => {
        verifyUserLogged();
        return userLogged.authStatus == 'not_verified' || userLogged.authStatus == 'not_authenticated' ? '' : userLogged.user?.userToken.name
    }

    const verifyUserLogged = () => {
        if (userLogged.authStatus == 'authenticated')
            return
            const responseApiUser =  UserLoggedLocalStorage();
            if (responseApiUser && responseApiUser?.success)
            {
                dispatch(setUserAuth(responseApiUser?.data))
                dispatch(setAuthStatus('authenticated'))   
            }else 
            {
                dispatch(setAuthStatus('not_authenticated'))
                localStorage.setItem(storageKey, '')
            }
        
    }

    const getToken = ():string  => {
        verifyUserLogged();
        return userLogged.authStatus == 'not_verified' || userLogged.authStatus == 'not_authenticated' ? '' : userLogged.user?.accessToken ?? ''
    }

    const signinAsync = async (userlogin: UserLogin): Promise<boolean> => {
        const userLoggged = await loginAsync(userlogin);
        if (userLoggged.success) {
            dispatch(setUserAuth(userLoggged.data))
            dispatch(setAuthStatus('authenticated'))
            const userLoggedStr = JSON.stringify(userLoggged)
            const userLoggedSave = AES.encrypt(userLoggedStr, secretKey);
            localStorage.setItem(storageKey, userLoggedSave.toString())
            return true;
        } else {
            dispatch(setAuthStatus('not_authenticated'))
            localStorage.setItem(storageKey, '')
            return false
        }
    }

    const listsUsersAsync = async (userListRequest: UserListRequest | null): Promise<ApiResponse<PagedDataResponse<UserListResponse>>> => {
        return await listUsersAsync(userListRequest);
    }

    const signoutAsync = async (): Promise<void> => {
        dispatch(setAuthStatus('not_authenticated'))
        localStorage.setItem(storageKey, '')
    }

    return {
        signinAsync,
        signoutAsync,
        getUserNameLogged,
        listsUsersAsync,
        getToken
    }
}

import axios, { AxiosError, AxiosInstance } from "axios"
import { ApiResponse, PropsApi } from "../types/global";
import { useAuth } from "../hooks/auth";
import React, { useEffect } from "react";

import { UserLoggedLocalStorage } from '../util/utilFunctions'
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { setMessage, setOpen } from "../redux/slices/snackBarSlice";
import { openLoading } from "../redux/slices/loadingSlice";


const api = ({
    withAuth = true,
    apiType = 'apiGatewaysUser',
}: PropsApi) => {
    let instance: AxiosInstance | null = null;

     const navigate = useNavigate()
     const dispatch = useAppDispatch();
     
    if (apiType == 'apiGatewaysUser') {
        instance = axios.create({
            baseURL: `${import.meta.env.VITE_API_GATEWAY_USERS_BASE_URL}`
        });

    } else
        if (apiType == 'apiGatewayOrders') {
            instance = axios.create({
                baseURL: import.meta.env.VITE_API_GATEWAY_USERS_BASE_URL
            });
        }




    const authApi = () => {

        if (withAuth && instance) {
            const respApi = UserLoggedLocalStorage();
            if (respApi) {
                if (respApi.success)
                    instance.defaults.headers.common['Authorization'] = `bearer ${respApi.data.accessToken}`;
            }

        }
    }

    React.useEffect(() => {
        authApi()
    }, [])


    const treatErrorHttp  = (error: any) => {

        const axiosErr = error as AxiosError
        if (axiosErr.response?.status == 401) {
            dispatch(setMessage('Não tem acesso se logue novamente'))
            dispatch(setOpen(true))
            navigate('/entrar')
        }
    }

    const getApiAsync = async (urls: string): Promise<ApiResponse<object>> => {
        try {
            dispatch(openLoading(true))
            authApi()
            const resp: ApiResponse<object> = (await instance!.get(urls)).data;
            dispatch(openLoading(false))
            return resp;
        } catch (error: any) {
            dispatch(openLoading(false))
            treatErrorHttp(error)
            const respError: ApiResponse<object> = error.response.data
            console.log(respError.errors);
            return respError!;
        }
    };

    const postApiAsync = async (urls: string, dataEnv: object) => {
        try {
            dispatch(openLoading(true))
            authApi()
            const resp = await instance?.post(urls, dataEnv);
            dispatch(openLoading(false))
            return resp;
        } catch (error) {
            dispatch(openLoading(false))
            treatErrorHttp(error)
            const errAxios = error as AxiosError;
            return errAxios;
        }
    };

    const putApiAsync = async (urls: string, dataEnv: object) => {
        try {
            dispatch(openLoading(true))
            authApi()
            const resp = await instance?.put(urls, dataEnv);
            dispatch(openLoading(false))
            return resp;
        } catch (error) {
            dispatch(openLoading(false))
            treatErrorHttp(error)    
            const errAxios = error as AxiosError;
            return errAxios;
        }
    };

    const deleteApiAsync = async (urls: string) => {
        try {
            dispatch(openLoading(true))
            authApi()
            const resp = await instance?.delete(urls);
            dispatch(openLoading(false))
            return resp;
        } catch (error) {
            dispatch(openLoading(false))
            treatErrorHttp(error)
            const errAxios = error as AxiosError;
            return errAxios;
        }
    };

    // Remova o ponto e vírgula aqui
    return {
        getApiAsync,
        postApiAsync,
        putApiAsync,
        deleteApiAsync
    };
};

export default api;

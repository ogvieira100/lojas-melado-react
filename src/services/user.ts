import { ApiResponse, PagedDataResponse } from "../types/global";
import { UserList, UserListRequest,  UserListResponse,  UserLogin, UserSignUp } from "../types/user";
import { objectToQueryString } from "../util/utilFunctions";
import  api  from "./api";

const apiUser = () => {
    const { getApiAsync } = api({ endpoint:'apiGatewayUser', apiType:'apiGatewaysUser' });

    const listUsersAsync = async (userListRequest:UserListRequest | null):Promise<ApiResponse<PagedDataResponse<UserListResponse>>>  => {
        if (!userListRequest)
        {
            const resp:ApiResponse<PagedDataResponse<UserListResponse>> = await getApiAsync(`v1/apiGatewayUser/list-users`);
            return resp;

        }else 
        {
            const resp:ApiResponse<PagedDataResponse<UserListResponse>> = await getApiAsync(`v1/apiGatewayUser/list-users${objectToQueryString(userListRequest)}`);
            return resp;
        }
        
    }

    const loginAsync = async (userlogin:UserLogin):Promise<ApiResponse<UserSignUp>> => {

       const login:ApiResponse<UserSignUp> = await getApiAsync(`v1/apiGatewayUser/login?email=${userlogin.email}&password=${userlogin.password}`)
        return login

    }
    return{
        loginAsync,
        listUsersAsync
    }

}

export default apiUser;
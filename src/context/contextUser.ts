import { createContext } from "react";
import { UserSearchContextType } from "../types/user";

export const UserSearchContext = createContext<UserSearchContextType>({
    userListRequest: {
        userListRequest: {
            page:1,
            limit:10,
            active:undefined,
            column:'',
            desc:false,
            nome:''
        },
        setUserListRequest: () => { }
    }
})
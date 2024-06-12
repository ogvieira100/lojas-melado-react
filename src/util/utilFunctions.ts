import { AES, enc } from "crypto-js";
import { ApiResponse } from "../types/global";
import { UserSignUp } from "../types/user";

export const objectToQueryString = (queryParameters:any) => {
    return queryParameters
      ? Object.entries(queryParameters).reduce(
          (queryString, [key, val], index) => {
           
            const symbol = queryString.length === 0 ? '?' : '&';
            queryString +=
            typeof val == 'undefined' ? '' :   `${symbol}${key}=${val}`;
            return queryString;
          },
          ''
        )
      : '';
};

export const UserLoggedLocalStorage = ():ApiResponse<UserSignUp> | null => {

    const storageKey = import.meta.env.VITE_STORAGE_KEY
    const secretKey = import.meta.env.VITE_SECRET_KEY

    const storage = localStorage.getItem(storageKey);
    if (storage) {
        const bytes = AES.decrypt(storage, secretKey)
        const decryptedData: ApiResponse<UserSignUp>  = JSON.parse(bytes.toString(enc.Utf8))
        if (decryptedData)
            return decryptedData;
    }
    return null
}
import { ReactNode } from "react"

export type PropsChildren  = {
    children:ReactNode
}

export type PagedDataResponse<T> = {

    items:T[],

    page:number, 
   
    pageSize:number,  
   
    totalItens:number,
   
    totalPages:number

}

export type PagedDataRequest = {
    page:number,
    limit:number,
    active?:boolean
    column:string
    desc:boolean
}

export type PropsApi = {
    endpoint: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: object,
    withAuth?: boolean,
    apiType?:'apiGatewayInvoices' | 'apiGatewayOrders' | 'apiGatewayRegister' | 'apiGatewaysUser'
}

export type LNotification = {
    priority: 'High' | 'Average' | 'Low'
    layer?: 'App' | 'Domain' | 'Repository' | 'Others'
    typeNotificationNoty: 'Alert' | 'Error' | 'Sucess' | 'Information' | 'BreakSystem',
    message:string 
}

export type ApiResponse<T> = {
        data:T
        success:boolean,
        errors:LNotification[]
}
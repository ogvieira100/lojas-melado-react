import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface SnackBarState  {
    message:string, 
    open:boolean,
    messageType: 'success' | 'error' | 'warning' | 'alert' | 'atention'
}

const initialState: SnackBarState =  {
    open:false,
    message:'',
    messageType : 'error'
}

export const snackSlice = createSlice({

    name:'snack',
    initialState,
    reducers:{
         setMessageShow:(state,action:PayloadAction<SnackBarState>)=>{
                state = {...action.payload}
            },
         setOpen:(state, action:PayloadAction<SnackBarState['open']>) =>{
                  state.open = action.payload;  
         },
         setMessage:(state,action:PayloadAction<SnackBarState['message']>)=>{
            state.message = action.payload
         }  
    }
})

export default snackSlice.reducer
export const { setMessageShow ,setOpen,setMessage} = snackSlice.actions
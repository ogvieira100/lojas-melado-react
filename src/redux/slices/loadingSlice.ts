import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LoadingState{
    open:boolean
    typeLoader:'barLoader' | 'beatLoader' | 'clockLoader' | 'hashLoader'

}

const initialState: LoadingState = {
    open:false,
    typeLoader: 'hashLoader'
}

const loadingSlice = createSlice({


    name : 'loading',
    initialState,
    reducers:{
                    openLoading:(state,action:PayloadAction<LoadingState['open']>)=>{
                            state.open = action.payload
                    },
                    setTypeLoading: (state, action: PayloadAction<LoadingState['typeLoader']>) => {
                            state.typeLoader = action.payload
                    },
            }     
});

export const { openLoading,  setTypeLoading } = loadingSlice.actions

export default loadingSlice.reducer
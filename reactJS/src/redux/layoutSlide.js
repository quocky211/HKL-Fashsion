import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    layout: null
};
const layoutSlide = createSlice({
    name: "layoutState",
    initialState,
    reducers: {
        changeLayout: (state, action) => {
            console.log(action.payload)
            state.layout = action.payload;
            if(!action.payload){
            toast.success("Đã đổi sang layout mặc định😉", {
                position: "top-center",
                autoClose: 200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });}
            else{
                toast.success("Đã đổi sang layout Christmas🎄", {
                    position: "top-center",
                    autoClose: 200,
                    hideProgressBar: false,
                    pauseOnHover: false,
                    closeOnClick: true,
                    draggable: true
            })
        }
        }
    },
    
});

export const {
    changeLayout
} = layoutSlide.actions;

export const layoutReducer = layoutSlide.reducer;

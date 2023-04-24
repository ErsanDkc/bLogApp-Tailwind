import { createSlice } from "@reduxjs/toolkit";


const initialState = [
    {
        id:1,
        name:"Hilal"
    },
    {
        id:2,
        name:"Ersan"
    },
    {
        id:3,
        name:"Emre"
    },
    {
        id:4,
        name:"Oğulcan"
    }
]

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers :{

    }
})

export const getAllUsers = (state) => state.users
export default userSlice.reducer
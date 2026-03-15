import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name:'theme',
    initialState: {
        value: 'light'
    },
    reducers: {
        changeThemeToDark: (state)=>{
            state.value = 'dark'
        },
        changeThemeToLight: (state)=>{
            state.value = 'light'
        }
    }
})

export const {changeThemeToDark, changeThemeToLight} = themeSlice.actions

export default themeSlice.reducer
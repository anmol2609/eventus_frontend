import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: "theme",
    initialState: { theme: "dark" },
    reducers: {
        setDarkTheme: (state) => {
            state.theme = "dark"
        },
        setLightTheme: (state) => {
            state.theme = "light"
        },
    },
})

export const { setDarkTheme, setLightTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer

export const rightSidebarSlice = createSlice({
  name: 'rightSidebar',
  initialState: { rightSidebarShow: false },
  reducers: {
    toggleRightSidebar: (state, action) => {
      state.rightSidebarShow = action.payload
    },
  },
})

export const { toggleRightSidebar } = rightSidebarSlice.actions
export const rightSidebarReducer = rightSidebarSlice.reducer;

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: { sidebarShow: false },
    reducers: {
        toggleSidebar: (state, action) => {
            state.sidebarShow = action.payload
        }
    }
})

export const { toggleSidebar } = sidebarSlice.actions
export const sidebarReducer = sidebarSlice.reducer


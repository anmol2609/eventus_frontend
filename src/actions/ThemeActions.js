import { DARK_THEME, TOGGLE_RIGHT_SIDEBAR, TOGGLE_SIDEBAR } from '../constants/ThemeConstants'

export const updateTheme = (theme) => (dispatch) => {
  dispatch({
    type: DARK_THEME,
    payload: theme,
  })
}

export const toggleRightSidebar = (value) => (dispatch) => {
  dispatch({
    type: TOGGLE_RIGHT_SIDEBAR,
    payload: value,
  })
}

export const toggleSidebar = (value) => (dispatch) => {
  dispatch({
    type: TOGGLE_SIDEBAR,
    payload: value,
  })
}

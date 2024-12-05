import {
  DARK_THEME,
  LIGHT_THEME,
  TOGGLE_RIGHT_SIDEBAR,
  TOGGLE_SIDEBAR,
} from '../constants/ThemeConstants'

export const ThemeReducer = (state = { theme: 'dark' }, action) => {
  switch (action.type) {
    case DARK_THEME:
      return {
        theme: 'dark',
      }
    case LIGHT_THEME:
      return {
        theme: 'light',
      }
    default:
      return state
  }
}

export const RightSidebarReducer = (state = { rightSidebarShow: false }, action) => {
  switch (action.type) {
    case TOGGLE_RIGHT_SIDEBAR:
      return {
        rightSidebarShow: action.payload,
      }
    default:
      return state
  }
}

export const SidebarReducer = (state = { sidebarShow: false }, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        sidebarShow: action.payload,
      }
    default:
      return state
  }
}

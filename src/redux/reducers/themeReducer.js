import { darkTheme, lightTheme } from "../../const/theme-data";

const initial = lightTheme;

export const themeReducer = (state = initial, action) => {
  switch (action.type) {
    case "light":
      return lightTheme;
    case "dark":
      return darkTheme;
    default:
      return state;
  }
};

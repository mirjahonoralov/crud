import { combineReducers } from "redux";
import { languageReducer } from "./languageReducer";
import { themeReducer } from "./themeReducer";

export const rootReducer = combineReducers({
  languageReducer,
  themeReducer,
});

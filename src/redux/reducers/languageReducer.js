import { en, ru, uz } from "../../const/lang-data";

const initial = uz;

export const languageReducer = (state = initial, action) => {
  switch (action.type) {
    case "uz":
      return uz;
    case "ru":
      return ru;
    case "en":
      return en;
    default:
      return state;
  }
};

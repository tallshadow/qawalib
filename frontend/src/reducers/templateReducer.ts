// src/reducers/templateReducer.ts
import { AnyAction } from "redux";
import { TemplatesByCategory } from "../types";

interface TemplateState {
  templatesByCategory: TemplatesByCategory;
  loading: boolean;
  error: string | null;
}

const initialState: TemplateState = {
  templatesByCategory: {},
  loading: false,
  error: null,
};

const templateReducer = (state = initialState, action: AnyAction): TemplateState => {
  switch (action.type) {
    case "FETCH_TEMPLATES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_TEMPLATES_SUCCESS":
      return {
        ...state,
        loading: false,
        templatesByCategory: action.payload,
      };
    case "FETCH_TEMPLATES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default templateReducer;

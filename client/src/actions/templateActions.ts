import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../reducers";
import { Template } from "../types";
import axios from "axios";

export const fetchTemplates = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_TEMPLATES_REQUEST" });
    const response = await axios.get<Template[]>("/api/templates");
    const templates = response.data;

    const templatesByCategory = templates.reduce((acc, template) => {
      const category = template.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(template);
      return acc;
    }, {} as { [category: string]: Template[] });

    dispatch({ type: "FETCH_TEMPLATES_SUCCESS", payload: templatesByCategory });
  } catch (error: any) {
    dispatch({ type: "FETCH_TEMPLATES_FAILURE", error: error.message });
  }
};

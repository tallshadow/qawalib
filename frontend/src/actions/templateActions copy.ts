// src/redux/actions/templateActions.ts

import axios from 'axios';
import { Dispatch } from 'redux';

export const FETCH_TEMPLATES_START = 'FETCH_TEMPLATES_START';
export const FETCH_TEMPLATES_SUCCESS = 'FETCH_TEMPLATES_SUCCESS';
export const FETCH_TEMPLATES_FAIL = 'FETCH_TEMPLATES_FAIL';

export const fetchTemplatesStart = () => ({
  type: FETCH_TEMPLATES_START,
});

export const fetchTemplatesSuccess = (templates: any[]) => ({
  type: FETCH_TEMPLATES_SUCCESS,
  payload: templates.reduce((acc, template) => {
    const category = template.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(template);
    return acc;
  }, {}),
});

export const fetchTemplatesFail = (error: string) => ({
  type: FETCH_TEMPLATES_FAIL,
  payload: error,
});

export const fetchTemplates = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchTemplatesStart());
    axios.get('/api/templates')
      .then(response => {
        dispatch(fetchTemplatesSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchTemplatesFail(error.message));
      });
  };
};

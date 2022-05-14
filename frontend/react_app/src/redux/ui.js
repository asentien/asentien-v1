import { createReducer } from "@reduxjs/toolkit";

const NAMESPACE = "ui";

const SET_ERRORS = "setErrors";
const SET_LOADING = "setLoading";
const SET_TOAST = "setToast";
const UNSET_ERRORS = "unsetErrors";
const UNSET_LOADING = "unsetLoading";
const UNSET_TOAST = "unsetToast";

export const setErrors = (namespace, key, errors) => ({
  errors,
  key,
  type: `${namespace}/${SET_ERRORS}`,
});

export const setLoading = (namespace, key) => ({
  key,
  type: `${namespace}/${SET_LOADING}`,
});

export const setToast = (message, typeoftoast) => ({
  payload: { typeoftoast, message },
  type: `${NAMESPACE}/${SET_TOAST}`,
});

export const unsetErrors = (namespace, key) => ({
  key,
  type: `${namespace}/${UNSET_ERRORS}`,
});

export const unsetLoading = (namespace, key) => ({
  key,
  type: `${namespace}/${UNSET_LOADING}`,
});

export const unsetToast = () => ({
  type: `${NAMESPACE}/${UNSET_TOAST}`,
});

const initialState = {
  errors: {},
  loading: {},
  toast: {
    message: null,
    typeoftoast: null,
  },
};

const uiReducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(
      (action) => action.type.endsWith(`/${SET_ERRORS}`),
      (state, action) => {
        state.errors[action.key] = action.errors || true;
      }
    )
    .addMatcher(
      (action) => action.type.endsWith(`/${SET_LOADING}`),
      (state, action) => {
        state.loading[action.key] = true;
        delete state.errors[action.key];
      }
    )
    .addMatcher(
      (action) => action.type.endsWith(`/${SET_TOAST}`),
      (state, action) => {
        state.toast = action.payload;
      }
    )
    .addMatcher(
      (action) => action.type.endsWith(`/${UNSET_ERRORS}`),
      (state, action) => {
        delete state.errors[action.key];
      }
    )
    .addMatcher(
      (action) => action.type.endsWith(`/${UNSET_LOADING}`),
      (state, action) => {
        state.loading[action.key] = false;
      }
    )
    .addMatcher(
      (action) => action.type.endsWith(`/${UNSET_TOAST}`),
      (state) => {
        state.toast = initialState.toast;
      }
    );
});

export default uiReducer;

export const selectErrors = (state, theKey) => state.ui.errors[theKey] || {};

export const selectLoading = (state, theKey, initialLoadingState = false) => {
  let loadingState = state.ui.loading[theKey];
  if (initialLoadingState && loadingState === undefined) {
    loadingState = true;
  }
  return loadingState;
};

export const selectLoadingSecondary = (
  state,
  theKey,
  initialLoadingState = false
) => {
  let loadingState = state.ui.loading[theKey];
  if (initialLoadingState && loadingState === undefined) {
    loadingState = true;
  }
  return loadingState;
};

export const selectFetched = (state, theKey) =>
  state.ui.loading[theKey] !== undefined;

export const selectFetchedSecondary = (state, theKey) =>
  state.ui.loading[theKey] !== undefined;

export const selectToast = (state) => state.ui.toast;

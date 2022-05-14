import { createSlice } from "@reduxjs/toolkit";

import baseServicesHandler from "../services/baseServicesHandler";
import { baseService } from "../services/searchServices";

import { setLoading, setToast, unsetLoading } from "./ui";

const NAMESPACE = "user";

export const key = {
  search: "search",
  searchNext: "searchNext",
};

const initialState = {
  search: {
    results: [],
  },
  popularSearch: {
    results: [],
  },
  searchString: "",
  popularSearchString: "",
};

const searchSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    setPopularSearch: (state, { payload }) => {
      state.popularSearch = payload;
    },
    setSearchNext: (state, { payload }) => {
      state.search.next = payload.next;
      state.search.results.push(...payload.results);
    },
    setPopularSearchNext: (state, { payload }) => {
      state.popularSearch.next = payload.next;
      state.popularSearch.results.push(...payload.results);
    },
    setSearchString: (state, { payload }) => {
      state.searchString = payload;
    },
    setPopularSearchString: (state, { payload }) => {
      state.popularSearchString = payload;
    },
    setClearSearch: (state, { payload }) => {
      state.search = [];
    },
  },
});

const { actions, reducer } = searchSlice;
export const {
  setClearSearch,
  setSearch,
  setPopularSearch,
  setSearchNext,
  setPopularSearchNext,
  setSearchString,
  setPopularSearchString,
} = actions;
export default reducer;

export const selectSearch = (state) => state.search.search;

export const selectPopularSearch = (state) => state.search.popularSearch;

export const selectSearchString = (state) => state.search.searchString;

export const selectPopularSearchString = (state) =>
  state.search.popularSearchString;

export const getSearch =
  (searchString, nextUrl = null) =>
  async (dispatch) => {
    let thisKey = key.search;
    if (nextUrl) {
      thisKey = key.searchNext;
    }
    try {
      dispatch(setLoading(NAMESPACE, thisKey));
      const data = await baseServicesHandler(
        baseService.getSearch(searchString),
        nextUrl
      );
      if (nextUrl) {
        dispatch(setSearchNext(data));
      } else {
        dispatch(setSearch(data));
      }
      dispatch(setSearchString(searchString));
    } catch (error) {
      dispatch(setToast("Failed to Load", "secondary"));
    } finally {
      dispatch(unsetLoading(NAMESPACE, thisKey));
    }
  };

export const getPopularSearch =
  (searchString, nextUrl = null) =>
  async (dispatch) => {
    let thisKey = key.search;
    if (nextUrl) {
      thisKey = key.searchNext;
    }
    try {
      dispatch(setLoading(NAMESPACE, thisKey));
      const data = await baseServicesHandler(
        baseService.getSearchPopular(searchString),
        nextUrl
      );
      if (nextUrl) {
        dispatch(setPopularSearchNext(data));
      } else {
        dispatch(setPopularSearch(data));
      }
      dispatch(setPopularSearchString(searchString));
    } catch (error) {
      dispatch(setToast("Failed to Load", "secondary"));
    } finally {
      dispatch(unsetLoading(NAMESPACE, thisKey));
    }
  };

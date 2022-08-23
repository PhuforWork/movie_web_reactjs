import { DISPLAY_LOADING, HIDE_LOADING } from "../types/name.type";

const LOADING_DEFAULT = {
  isLoading: false,
};

export const loadingReducer = (state = LOADING_DEFAULT, { type, payload }) => {
  switch (type) {
    case DISPLAY_LOADING: {
      state.isLoading = true;
      return { ...state };
    }
    case HIDE_LOADING: {
      state.isLoading = false;
      return { ...state };
    }
    default:
      return state;
  }
};

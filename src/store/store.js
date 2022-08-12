import { combineReducers, createStore } from "redux";
import { carouselReducer } from "./reducers/carousel.reducer";
import { userReducer } from "./reducers/user.reducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  carouselReducer: carouselReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

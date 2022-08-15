import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { carouselReducer } from "./reducers/carousel.reducer";
import { danhsachphimReducer } from "./reducers/danhsachphim.reducer";

const rootReducer = combineReducers({
  danhsachphimReducer: danhsachphimReducer,
  carouselReducer: carouselReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

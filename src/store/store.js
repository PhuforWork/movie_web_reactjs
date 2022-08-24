import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { carouselReducer } from "./reducers/carousel.reducer";
import { danhsachphimReducer } from "./reducers/danhsachphim.reducer";
import { loadingReducer } from "./reducers/loading.reducer";
import { quanlydatveReducer } from "./reducers/quanlydatve";
import { quanlyUserReducer } from "./reducers/quanlynguoidung.reducer";
import { quanlyrapReducer } from "./reducers/quanlyrap.reducer";
const rootReducer = combineReducers({
  danhsachphimReducer: danhsachphimReducer,
  carouselReducer: carouselReducer,
  quanlyrapReducer: quanlyrapReducer,
  quanlyUserReducer: quanlyUserReducer,
  quanlydatveReducer: quanlydatveReducer,
  loadingReducer: loadingReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

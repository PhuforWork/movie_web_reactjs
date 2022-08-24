import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DISPLAY_LOADING_ACTION, HIDE_LOADING_ACTION } from "../store/reducers/actions/loading.action";


// import { LoadingContext } from "../contexts/loading.context";

export const useAsync = ({ dependancies = [], service, condition = true }) => {
  // const [_, setLoadingState] = useContext(LoadingContext);
  const [state, setState] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (condition) {
      fetchData();
    }
  }, dependancies);
  const fetchData = async () => {
    // setLoadingState({ isLoading: true });
    dispatch(DISPLAY_LOADING_ACTION);

    // call api
    const results = await service();
    // console.log(results);
    // end call api
    dispatch(HIDE_LOADING_ACTION);

    // setLoadingState({ isLoading: false });

    setState(results.data.content);
    
  };
  return {
    state,
  };
};

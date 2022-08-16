import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeCarousel from "../../components/carousel/home-carousel";
import MultipleRows from "../../components/libs/ReactSlick/MultipleRowslick";
import { useAsync } from "../../hooks/useAsync";
import { fetchMovieListApi } from "../../services/danhsachphim";
import { SET_MOVIELIST } from "../../store/types/name.type";
// import Film from "../../components/film/film";
import HomeMenu from "./home-menu";
export default function Home() {
  const dispatch = useDispatch();
  const { movieInfo } = useSelector((state) => state.danhsachphimReducer);
  const { state: movielistInfo } = useAsync({
    dependancies: [],
    service: () => fetchMovieListApi(),
  });
  // console.log(movielistInfo);
  useEffect(() => {
    dispatch({
      type: SET_MOVIELIST,
      payload: movielistInfo,
    });
  }, [movielistInfo]);

  return (
    <div>
      <div>
        <HomeCarousel />
      </div>
      <section className="py-6 sm:py-12 ">
        <div className="w-11/12 p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">
              Danh Sách Phim Chiếu Rạp 2022
            </h2>
          </div>
          {/* list phim */}
          <MultipleRows movieInfo={movieInfo} />
        </div>
      </section>
      <div style={{ margin: "100px 0" }}>
        <HomeMenu />
      </div>
    </div>
  );
}

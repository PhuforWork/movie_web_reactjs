import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeCarousel from "../../components/carousel/home-carousel";
import MultipleRows from "../../components/libs/ReactSlick/MultipleRowslick";
import { useAsync } from "../../hooks/useAsync";
import { fetchMovieListApi } from "../../services/danhsachphim";
import Film from "../../components/film/film";
import HomeMenu from "./home-menu";

export default function Home() {
  const { movieInfo } = useSelector((state) => state.danhsachphimReducer);
  const { state: movielistInfo } = useAsync({
    dependancies: [],
    service: () => fetchMovieListApi(),
  });
  useEffect(() => {}, []);
  // const renderMovieList = () => {
  //   return movieInfo.map((ele) => {
  //     return <Film key={ele.maPhim} props={ele} />;
  //   });
  // };

  return (
    <div>
      <div>
        <HomeCarousel />
      </div>
      <section className="py-6 sm:py-12 ">
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">
              Danh Sách Phim Chiếu Rạp 2022
            </h2>
            <p className="font-serif text-sm dark:text-gray-400"></p>
          </div>
          {/* list phim */}
          {/* <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {renderMovieList()}
          </div> */}
            <MultipleRows movieInfo={movieInfo}/>
        </div>
      </section>
      <div style={{ margin: "100px 0" }}>
        <HomeMenu />
      </div>
    </div>
  );
}

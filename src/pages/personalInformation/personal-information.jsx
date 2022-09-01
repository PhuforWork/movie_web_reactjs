import moment from "moment";
import { Rate, Tabs } from "antd";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";
import { fetchInfoCheduleMovieApi } from "../../services/quanlyphim";
import { SET_CHEDULEMOVIE } from "../../store/types/name.type";
import "./details.scss";
import Loading from "../../components/loading/loading";



export default function PersonalInformation() {
    const { TabPane } = Tabs;
    return (
      <div className="container-1" style={{ background: `url("https://picsum.photos/2000")` }}>
        <Loading />
        <div className="filter py-56">
          <div className="grid grid-cols-12 ">
            <div className="col-span-5 col-start-4 component-1 flex items-center">
              <div className="grid grid-cols-3 1">
                {/* <img className="pr-5" src={hinhAnh} alt="" /> */}
                <div className="col-span-2 mt-36">
                  <p className="text-rose-900 normal-case">
                    {/* Ngày chiếu: {moment(ngayKhoiChieu).format("DD-MM-YYYY")} */}
                  </p>
                  {/* <h5 className="text-orange-600">{tenPhim}</h5> */}
                  <p className="text-black text-xs leading-normal normal-case">
                    {/* {moTa} */}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 ">
            <div className="col-span-8 col-start-3 bg-slate-700/50">
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Lịch chiếu" key="1">
                  <Tabs tabPosition="left">
                    {/* {heThongRapChieu?.map((ele, index) => {
                      return (
                        <TabPane
                          tab={
                            <div>
                              <div style={{ width: 50 }}>
                                <img src={ele.logo} alt="" />
                              </div>
                              <div>{ele.tenHeThongRap}</div>
                            </div>
                          }
                          key={index}
                        >
                          {ele.cumRapChieu?.map((cumRap, index) => {
                            return (
                              <div key={index}>
                                <div className="flex items-center">
                                  <div>
                                    <img
                                      src={cumRap.hinhAnh}
                                      style={{ width: 50, height: 70 }}
                                      alt=""
                                    />
                                  </div>
                                  <div className="pl-3">
                                    <p className=" text-xl font-bold mb-2">
                                      {cumRap.tenCumRap}
                                    </p>
                                    <p className="mb-0">{cumRap.diaChi}</p>
                                  </div>
                                </div>
                                <div className="flex">
                                  {cumRap.lichChieuPhim
                                    ?.slice(0, 12)
                                    .map((lichChieu, index) => {
                                      return (
                                        <NavLink
                                          to={`/booking/${lichChieu.maLichChieu}`}
                                          key={index}
                                          className="pr-2 pt-2 text-lime-300"
                                        >
                                          {moment(
                                            lichChieu.ngayChieuGioChieu
                                          ).format("hh:mm A")}
                                        </NavLink>
                                      );
                                    })}
                                </div>
                              </div>
                            );
                          })}
                        </TabPane>
                      );
                    })} */}
                  </Tabs>
                </TabPane>
                <TabPane tab="Thông tin" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Đánh giá" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
}

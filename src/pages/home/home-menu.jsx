import { Tabs } from "antd";
import moment from "moment";
import _ from "lodash";
import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

export default function HomeMenu(props) {
  const [tabPosition, setTabPosition] = useState("left");

  const renderMovieTheater = () => {
    return props.hethongRapChieu?.map((hethongRap, index) => {
      return (
        <TabPane
          tab={
            <img
              src={hethongRap.logo}
              className="rounded-full"
              alt="pic"
              style={{ width: "30px", height: "30px" }}
            />
          }
          key={hethongRap.maHeThongRap}
        >
          <Tabs tabPosition={tabPosition} >
            {hethongRap.lstCumRap?.slice(0, 5).map((listRap, index) => {
              const dsp = _.first(listRap.danhSachPhim);
              const lctp = _.first(dsp.lstLichChieuTheoPhim);
              return (
                <TabPane
                  key={index}
                  tab={
                    <div
                      style={{
                        width: "270px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={hethongRap.logo}
                        className="rounded-full"
                        alt="pic"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <div
                        style={{
                          paddingLeft: "20px",
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "0px",
                          }}
                        >
                          {listRap.tenCumRap}
                        </p>
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "0px",
                          }}
                        >
                          {listRap.diaChi}
                        </p>
                        <NavLink
                          to={`/booking/${lctp.maLichChieu}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "0px",
                            color: "orange",
                          }}
                        >
                          Chi tiết
                        </NavLink>
                      </div>
                    </div>
                  }
                >
                  {/* loading phim */}
                  {listRap.danhSachPhim?.slice(0, 4).map((dsPhim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="mb-3 mt-1" style={{ display: "flex" }}>
                          <div style={{ display: "flex" }}>
                            <img
                              style={{ width: 100, height: 150 }}
                              src={dsPhim.hinhAnh}
                              alt={dsPhim.tenPhim}
                            />
                            <div className="ml-3">
                              <p
                                style={{ fontWeight: "bold", color: "#f759ab" }}
                              >
                                {dsPhim.tenPhim}
                              </p>
                              <p style={{ color: "#0050b3" }}>
                                {listRap.diaChi}
                              </p>
                              <div className="grid grid-cols-6 gap-2">
                                {dsPhim.lstLichChieuTheoPhim
                                  ?.slice(0, 5)
                                  .map((ngayChieuPhim, index) => {
                                    return (
                                      <Fragment key={index}>
                                        <NavLink
                                          style={{ color: "#fa8c16" }}
                                          to={`/details/${dsPhim.maPhim}`}
                                        >
                                          {moment(
                                            ngayChieuPhim.ngayChieuGioChieu
                                          ).format("hh:mm A")}{" "}
                                        </NavLink>
                                      </Fragment>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  return (
    <div>
      <Tabs tabPosition={tabPosition}>{renderMovieTheater()}</Tabs>
    </div>
  );
}

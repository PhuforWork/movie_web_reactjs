import moment from "moment";
import { Tabs } from "antd";
import _ from "lodash";
import {
  CloseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { Fragment } from "react";
// import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";
import {
  fetchBookedTicketApi,
  fetchCheduleShowMovieApi,
  fetchHistoryTicketApi,
} from "../../services/lichChieu";
import {
  CHANGE_TABS,
  FINISH_BOOKTICKET,
  SET_BOOKING_MOVIE,
  SET_BOOK_TICKET,
  SET_HISTORY_BOOKED,
  SET_SEAT_BOOKED,
} from "../../store/types/name.type";
import "./booking.scss";
import {
  DISPLAY_LOADING_ACTION,
  HIDE_LOADING_ACTION,
} from "../../store/reducers/actions/loading.action";
import Loading from "../../components/loading/loading";

const { TabPane } = Tabs;

export default function BookingTicket(props) {
  const { tabActives } = useSelector((state) => state.quanlydatveReducer);
  const dispatch = useDispatch();
  return (
    <div className="p-20">
      <Tabs
        defaultActiveKey="1"
        activeKey={tabActives}
        onChange={(key) => {
          dispatch({ type: CHANGE_TABS, payload: key });
        }}
      >
        <TabPane tab="Đặt vé" key="1">
          <Booking {...props} />
        </TabPane>
        <TabPane tab="Kết quả đặt vé" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
}

function Booking(props) {
  const quanlynguoidung = useSelector((state) => state.quanlyUserReducer);
  const quanLyDatve = useSelector((state) => state.quanlydatveReducer);
  const { thongTinPhim, danhSachGhe } = quanLyDatve.chiTietPhongVe;
  const { danhSachGheDangDat, danhSachDatVe } = quanLyDatve;
  // const [selectSeat, setSelectSeat] = useState();
  // console.log(khachHangDangDat);
  const dispatch = useDispatch();
  const params = useParams();
  const { state: chiTietDatVe } = useAsync({
    dependancies: [danhSachDatVe],
    service: () => fetchCheduleShowMovieApi(params.id),
  });
  useEffect(() => {
    dispatch({
      type: SET_BOOKING_MOVIE,
      payload: chiTietDatVe,
    });
  }, [chiTietDatVe]);
  useEffect(() => {
    dispatch({
      type: SET_BOOK_TICKET,
      payload: { maLichChieu: params.id, danhSachVe: danhSachGheDangDat },
    });
  }, [danhSachGheDangDat]);

  const handleBookingTicket = async () => {
    dispatch(DISPLAY_LOADING_ACTION);
    await fetchBookedTicketApi(danhSachDatVe);
    // dat ve thanh cong
    // await fetchCheduleShowMovieApi(danhSachDatVe.maLichChieu);
    dispatch({ type: SET_BOOK_TICKET });
    dispatch({ type: FINISH_BOOKTICKET });
    dispatch(HIDE_LOADING_ACTION);
    dispatch({ type: CHANGE_TABS, payload: "2" });
  };

  const renderSeat = () => {
    return danhSachGhe?.map((ele, index) => {

      let classGheVip = ele.loaiGhe === "Vip" && "gheVip";
      let classGheDaDat = ele.daDat && "gheDaDat";
      let classUserDatVe = "";
      let classGheDangDat = "";

      let indexGheDangDat = danhSachGheDangDat?.findIndex(
        (gheDD) => gheDD.maGhe === ele.maGhe
      );
      if (indexGheDangDat !== -1) {
        classGheDangDat = "gheDangDat";
      }

      if (quanlynguoidung.userAccount.taiKhoan === ele.taiKhoanNguoiDat) {
        classUserDatVe = "gheUserDat";
      }

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch({
                type: SET_SEAT_BOOKED,
                payload: ele,
              });
            }}
            disabled={ele.daDat }
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classUserDatVe}  text-center`}
          >
            {ele.daDat ? (
              classUserDatVe !== "" ? (
                <UserOutlined
                  style={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              ) : (
                <CloseOutlined
                  style={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              )
            )  : (
              ele.stt
            )}
          </button>
          {(index + 1) % 16 === 0 && <br />}
        </Fragment>
      );
    });
  };
  return (
    <div className=" min-h-screen ">
      <div className="grid grid-cols-12">
        <div className="place-content-center justify-center col-span-8 col-start-2 pt-24 ">
          <div className="flex flex-col items-center ">
            <div
              className="bg-black"
              style={{ width: "80%", height: 15 }}
            ></div>
            <div className="trapezoid">
              <h5 className="text-center text-red-900 my-2">Màn hình</h5>
            </div>
          </div>
          <div className=" py-10 pl-20">{renderSeat()}</div>
          <div className="my-3 flex justify-center ">
            <table className="min-w-full text-center  ">
              <thead className="bg-blue-100 p-2 border-b ">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 p-2 "
                  >
                    Ghế chưa đặt
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 p-2 "
                  >
                    Ghế đang đặt
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 p-2 "
                  >
                    Ghế Vip
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 p-2 "
                  >
                    Ghế đã được đặt
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 p-2 "
                  >
                    Ghế người dùng đã đặt
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="border-b bg-purple-100 border-blue-200">
                  <td className="p-2 whitespace-nowrap">
                    <button className="ghe text-center">00</button>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <button className="ghe gheDangDat text-center">00</button>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <button className="ghe gheVip text-center">00</button>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <button className="ghe gheDaDat text-center">00</button>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <button className="ghe gheUserDat text-center">
                      <UserOutlined
                        style={{
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-3 col-start-10 pt-24">
          <div className="px-5">
            <h3 className="text-green-400 text-center text-2xl">
              {" "}
              {danhSachGheDangDat
                .reduce((pre, curr) => {
                  return (pre += curr.giaVe);
                }, 0)
                .toLocaleString()}{" "}
              đ{" "}
            </h3>
            <hr />
            <h3 className="text-xl">{thongTinPhim?.tenPhim}</h3>
            <p>{thongTinPhim?.diaChi}</p>
            <p>
              Ngày chiếu: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}{" "}
              {thongTinPhim?.tenRap}
            </p>
            <hr />
            <div className="flex flex-row">
              <div className="w-4/5">
                <span className="text-red-400">Ghế</span>
                {_.sortBy(danhSachGheDangDat, ["stt"])?.map((ele, index) => {
                  return (
                    <span key={index} className="text-green-500 text-xl">
                      {" "}
                      {ele.stt}
                    </span>
                  );
                })}
              </div>
              <div className="text-right col-span-1">
                {danhSachGheDangDat
                  .reduce((pre, curr) => {
                    return (pre += curr.giaVe);
                  }, 0)
                  .toLocaleString()}
                đ
              </div>
            </div>
            <hr />
            <div className="">
              <i>Email</i>
              <br />
              {quanlynguoidung.userAccount?.email}
            </div>
            <hr />
            <div className="">
              <i>Phone</i>
              <br />
              {quanlynguoidung.userAccount?.soDT}
            </div>
            <hr />
          </div>
          <div className="mb-0 flex flex-col justify-center items-center ">
            <div
              onClick={handleBookingTicket}
              className="bg-green-500 text-white w-full text-center font-bold text-xl py-3"
            >
              Đặt vé
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// /////////////////////

function KetQuaDatVe(props) {
  // const quanlynguoidung = useSelector((state) => state.quanlyUserReducer);
  // console.log(quanlynguoidung);
  const { infoUserTicket } = useSelector((state) => state.quanlyUserReducer);
  // console.log(infoUserTicket);
  const dispatch = useDispatch();
  const { state: historyTicket } = useAsync({
    dependancies: [],
    service: () => fetchHistoryTicketApi(),
  });
  useEffect(() => {
    dispatch({
      type: SET_HISTORY_BOOKED,
      payload: historyTicket,
    });
  }, [historyTicket]);

  const renderInforTicket = () => {
    return infoUserTicket.thongTinDatVe?.map((ele, index) => {
      const dsGhe = _.first(ele.danhSachGhe);
      // console.log(dsGhe.tenGhe);
      return (
        <div className="p-2  md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ele.hinhAnh}
            />
            <div className="flex-grow">
              <h5 className="text-gray-900 title-font font-medium text-red-500">
                {ele.tenPhim}
              </h5>
              <p className="text-gray-500">
                Giờ chiếu: {moment(ele.ngayDat).format("hh:mm A")} - Ngày chiếu:{" "}
                {moment(ele.ngayDat).format("DD/MM/YYYY")}
              </p>
              <p className="text-gray-500">Địa điểm: {dsGhe.tenHeThongRap}</p>
              <p className="text-gray-500 flex flex-wrap">
                Rạp: {dsGhe.tenRap} - Ghế:{" "}
                {ele.danhSachGhe.map((ghe, index) => {
                  return (
                    <span className="text-lime-500 " key={index}>
                      [ {ghe.tenGhe} ]{" "}
                    </span>
                  );
                })}
              </p>
              <p className="text-gray-500">
                Thời lượng phim: {ele.thoiLuongPhim} phút
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <section className="text-gray-600 body-font">
      <Loading />
      <div className=" px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-yellow-700">
            Lịch sử đặt vé của khách hàng
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Cùng xem lại thông tin địa điểm và thời gian để xem phim vui vẻ nhé
            !
          </p>
        </div>
        <div className="flex flex-wrap -m-2">{renderInforTicket()}</div>
      </div>
    </section>
  );
}

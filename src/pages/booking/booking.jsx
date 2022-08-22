import moment from "moment";
import _ from "lodash";
import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";
import {
  fetchBookedTicketApi,
  fetchCheduleShowMovieApi,
} from "../../services/lichChieu";
import {
  SET_BOOKING_MOVIE,
  SET_BOOK_TICKET,
  SET_SEAT_BOOKED,
} from "../../store/types/name.type";
import "./booking.scss";

export default function Booking() {
  const quanlynguoidung = useSelector((state) => state.quanlyUserReducer);
  const quanLyDatve = useSelector((state) => state.quanlydatveReducer);
  const { thongTinPhim, danhSachGhe } = quanLyDatve.chiTietPhongVe;
  const { danhSachGheDaDat, danhSachDatVe } = quanLyDatve;
  // const [selectSeat, setSelectSeat] = useState();

  const dispatch = useDispatch();
  const params = useParams();
  const { state: chiTietDatVe } = useAsync({
    dependancies: [],
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
      payload: { maLichChieu: params.id, danhSachVe: danhSachGheDaDat },
    });
  }, [danhSachGheDaDat]);
  const handleBookingTicket = async () => {
    const dsVe = danhSachGheDaDat?.map((ele) => {
      return {
        maGhe: ele.maGhe,
        giaVe: ele.giaVe,
      };
    });
    const submitVe = {
      maLichChieu: params.id,
      danhSachVe: dsVe
    }
    console.log(submitVe);
    await fetchBookedTicketApi(submitVe);
  };

  const renderSeat = () => {
    return danhSachGhe?.map((ele, index) => {
      let classGheVip = ele.loaiGhe === "Vip" && "gheVip";
      let classGheDaDat = ele.daDat && "gheDaDat";
      let classUserDatVe = "";
      let classGheDangDat = "";

      let indexGheDangDat = danhSachGheDaDat?.findIndex(
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
            disabled={ele.daDat}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classUserDatVe}`}
          >
            {ele.tenGhe}
          </button>
          {(index + 1) % 16 === 0 && <br />}
        </Fragment>
      );
    });
  };
  return (
    <div className=" min-h-screen ">
      <div className="grid grid-cols-12">
        <div className="col-span-8 pt-24 pl-24">
          <div className="flex flex-col items-center ">
            <div
              className="bg-black"
              style={{ width: "80%", height: 15 }}
            ></div>
            <div className="trapezoid">
              <h5 className="text-center text-red-900 my-2">Màn hình</h5>
            </div>
          </div>
          <div className="pt-10">{renderSeat()}</div>
        </div>
        <div className="col-span-3 col-start-10 pt-24">
          <div className="px-5">
            <h3 className="text-green-400 text-center text-2xl">
              {" "}
              {danhSachGheDaDat
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
                {_.sortBy(danhSachGheDaDat, ["stt"])?.map((ele, index) => {
                  return (
                    <span key={index} className="text-green-500 text-xl">
                      {" "}
                      {ele.stt}
                    </span>
                  );
                })}
              </div>
              <div className="text-right col-span-1">
                {danhSachGheDaDat
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
          <div className="mb-0 h-3/4 flex flex-col justify-center items-center ">
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

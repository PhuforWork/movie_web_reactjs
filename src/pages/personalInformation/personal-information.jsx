import moment from "moment";
import {
  Rate,
  Tabs,
  Table,
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Select,
} from "antd";
import _ from "lodash";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";
import {
  GET_PERSONAL_INFORMATION,
  USER_ACCOUNT_KEY,
} from "../../store/types/name.type";
import "./details.scss";
import Loading from "../../components/loading/loading";
import {
  fetchCapNhatThongTinNguoiDung,
  fetchTakeInfoUserApi,
} from "../../services/quanlyuser";
import { GROUP_ID } from "../../constants/common";

export default function PersonalInformation() {
  const navigate = useNavigate();
  const params = useParams();
  const { persionalInformation } = useSelector(
    (state) => state.quanlyUserReducer
  );
  // console.log(persionalInformation);
  const dispatch = useDispatch();
  const { state: thongTinCaNhan } = useAsync({
    dependancies: [],
    service: () => fetchTakeInfoUserApi(params.taiKhoan),
  });

  useEffect(() => {
    dispatch({
      type: GET_PERSONAL_INFORMATION,
      payload: thongTinCaNhan,
    });
  }, [thongTinCaNhan]);

  const { TabPane } = Tabs;

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      width: "20%",
      render: (text, object) => {
        console.log(object);
        return <img width={50} height={50} src={text} alt={object.maVe} />;
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        if (a.tenPhim.toLowerCase().trim() > b.tenPhim.toLowerCase().trim()) {
          return 1;
        } else {
          return -1;
        }
      },
      width: "20%",
    },
    {
      title: "Ngày đặt",
      dataIndex: "ngayDat",
      render: (text, object) => {
        return <p>{moment(text).format("DD/MM/YYYY hh:mm:ss A")}</p>;
      },
    },
    {
      title: "Ghế đã đặt",
      dataIndex: "tenRapTenGhe",
      width: "10%",
      render: (text) => {
        return <span>Ghế {text.tenGhe}</span>;
      },
    },
    {
      title: "Hệ thống rạp",
      dataIndex: "tenHeThongRap",
      render: (text) => {
        return (
          <>
            <span>{text.tenHeThongRap}</span>
            <span>-{text.tenRap}</span>
          </>
        );
      },
    },
  ];
  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //   },
  // ];
  const data = persionalInformation.thongTinDatVe?.map((ele, index) => {
    const dsGhe = _.first(ele.danhSachGhe);
    return {
      key: index + 1,
      hinhAnh: ele.hinhAnh,
      tenPhim: ele.tenPhim,
      ngayDat: ele.ngayDat,
      tenHeThongRap: dsGhe,
      tenRapTenGhe: dsGhe,
    };
  });

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: persionalInformation?.taiKhoan,
      matKhau: persionalInformation?.matKhau,
      email: persionalInformation?.email,
      soDt: persionalInformation?.soDT,
      maNhom: GROUP_ID,
      maLoaiNguoiDung: persionalInformation?.maLoaiNguoiDung,
      hoTen: persionalInformation?.hoTen,
    },
    onSubmit: async (values) => {
      try {
        const result = await fetchCapNhatThongTinNguoiDung(values);
        if (result.data.content) {
          notification.success({
            message: "Cập nhật người dùng thành công",
          });
          navigate("/home");
        }
      } catch (error) {
        notification.error({
          message: error.response.data.content,
        });
      }
    },
  });

  const handleChangeFeild = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };

  return (
    <div
      className="container-1"
      style={{ background: `url("https://picsum.photos/1000")` }}
    >
      <Loading />
      <div className="filter py-56">
        <div className="grid grid-cols-12 ">
          <div className="col-span-8 col-start-3 bg-slate-700/50">
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Thông tin cá nhân" key="1">
                <div className="pr-40">
                  <Form
                    {...formItemLayout}
                    onSubmitCapture={formik.handleSubmit}
                  >
                    <h3 className="text-center pb-4 pl-10">
                      Cập nhật người dùng - {persionalInformation?.hoTen}{" "}
                    </h3>
                    <Form.Item label="E-mail" tooltip="Ex: name123@gmail.com">
                      <Input
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Tài khoản"
                      tooltip="Trường này không được phép đổi"
                      hasFeedback
                    >
                      <Input
                        name="taiKhoan"
                        onChange={formik.handleChange}
                        value={formik.values.taiKhoan}
                        disabled={true}
                      />
                    </Form.Item>
                    <Form.Item label="Mật khẩu" hasFeedback>
                      <Input.Password
                        name="matKhau"
                        onChange={formik.handleChange}
                        value={formik.values.matKhau}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Họ và tên"
                      tooltip="Nguyễn Văn A"
                      hasFeedback
                    >
                      <Input
                        name="hoTen"
                        onChange={formik.handleChange}
                        value={formik.values.hoTen}
                      />
                    </Form.Item>
                    <Form.Item label="Số điện thoại">
                      <Input
                        style={{
                          width: "100%",
                        }}
                        name="soDt"
                        onChange={formik.handleChange}
                        value={formik.values.soDt}
                      />
                    </Form.Item>
                    <Form.Item label="Loại người dùng">
                      <Select
                        placeholder="Chọn loại người dùng"
                        name="maLoaiNguoiDung"
                        onChange={handleChangeFeild}
                        value={formik.values.maLoaiNguoiDung}
                      >
                        <Option value="QuanTri">Quản Trị</Option>
                        <Option value="KhachHang">Khách hàng</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                      <Button type="primary" htmlType="submit">
                        Save
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>
              <TabPane tab="Lịch sử dặt vé" key="2">
                <Table
                  columns={columns}
                  dataSource={data}
                  onChange={onChange}
                  scroll={{
                    y: 400,
                  }}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

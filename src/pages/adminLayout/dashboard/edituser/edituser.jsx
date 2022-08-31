import {
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
import React, { useState } from "react";
import { useFormik } from "formik";
import { GROUP_ID } from "../../../../constants/common";
import {
  fetchAddUserApi,
  fetchTakeInfoUserApi,
  fetchUpdateInfoUserApi,
} from "../../../../services/quanlyuser";
import { useNavigate, useParams } from "react-router";
import "./edituser.scss";
import { useAsync } from "../../../../hooks/useAsync";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_INFO_USER } from "../../../../store/types/name.type";

export default function Edituser() {
  const { userTakeInfo } = useSelector((state) => state.quanlyUserReducer);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
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
      taiKhoan: userTakeInfo?.taiKhoan,
      matKhau: userTakeInfo?.matKhau,
      email: userTakeInfo?.email,
      soDt: userTakeInfo?.soDT,
      maNhom: GROUP_ID,
      maLoaiNguoiDung: userTakeInfo?.maLoaiNguoiDung,
      hoTen: userTakeInfo?.hoTen,
    },
    onSubmit: async (values) => {
      try {
        const result = await fetchUpdateInfoUserApi(values);
        if (result.data.content) {
          notification.success({
            message: "Cập nhật người dùng thành công",
          });
          navigate("/admin/dashboard");
        }
      } catch (error) {
        console.log(error.response.data.content);
        notification.error({
          message: error.response.data.content,
        });
      }
    },
  });
  const { state: layThongTinNguoiDung } = useAsync({
    dependancies: [],
    service: () => fetchTakeInfoUserApi(params.taiKhoan),
  });
  useEffect(() => {
    dispatch({
      type: GET_INFO_USER,
      payload: layThongTinNguoiDung,
    });
  }, [layThongTinNguoiDung]);
  const handleChangeFeild = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };
  return (
    <div className="pr-10">
      <Form {...formItemLayout} onSubmitCapture={formik.handleSubmit}>
        <h3 className="text-center pb-4">Cập nhật người dùng - {userTakeInfo?.hoTen} </h3>
        <Form.Item label="E-mail" tooltip="Ex: name123@gmail.com">
          <Input name="email" onChange={formik.handleChange} value={formik.values.email}/>
        </Form.Item>
        <Form.Item label="Tài khoản" tooltip="Trường này không được phép đổi" hasFeedback>
          <Input name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} disabled={true}/>
        </Form.Item>
        <Form.Item label="Mật khẩu" hasFeedback>
          <Input.Password name="matKhau" onChange={formik.handleChange} value={formik.values.matKhau}/>
        </Form.Item>
        <Form.Item label="Họ và tên" tooltip="Nguyễn Văn A" hasFeedback>
          <Input name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
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
  );
}

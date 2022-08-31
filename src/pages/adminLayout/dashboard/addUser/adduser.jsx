import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import React, { useState } from "react";
import "./adduser.scss";
import { useFormik } from "formik";

export default function Adduser() {
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
    initialValues: {
      hoTen: "",
      maLoaiNguoiDung: "",
      matKhau: "",
      soDt: "",
      taiKhoan: "",
      email: "",
    },
    onSubmit: (value) => {
      console.log(value);
    },
  });
  return (
    <div className="pr-10">
      <Form {...formItemLayout} onSubmitCapture={formik.handleSubmit}>
        <h3 className="text-center pb-4">Thêm người dùng</h3>
        <Form.Item name="email" label="E-mail" tooltip="Ex: name123@gmail.com">
          <Input />
        </Form.Item>
        <Form.Item label="Tài khoản" tooltip="Please type ID" hasFeedback>
          <Input name="taiKhoan" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item  label="Mật khẩu" hasFeedback>
          <Input.Password name="matKhau" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Họ và tên" tooltip="Nguyễn Văn A" hasFeedback>
          <Input name="hoTen" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            style={{
              width: "100%",
            }}
            name="soDt"
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Loại người dùng">
          <Select placeholder="Chọn loại người dùng" name="maLoaiNguoiDung" >
            <Option value="QuanTri">Quản Trị</Option>
            <Option value="KhachHang">Khách hàng</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

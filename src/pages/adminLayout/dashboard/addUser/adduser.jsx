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
import "./adduser.scss";
import { useFormik } from "formik";
import { GROUP_ID } from "../../../../constants/common";
import { fetchAddUserApi } from "../../../../services/quanlyuser";
import { useNavigate } from "react-router";

export default function Adduser() {
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
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUP_ID,
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await fetchAddUserApi(values);
        if (result.data.content) {
          notification.success({
            message: "thêm người dùng thành công",
          });
          navigate("/admin/dashboard")
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
    <div className="pr-10">
      <Form {...formItemLayout} onSubmitCapture={formik.handleSubmit}>
        <h3 className="text-center pb-4">Thêm người dùng</h3>
        <Form.Item label="E-mail" tooltip="Ex: name123@gmail.com">
          <Input name="email" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Tài khoản" tooltip="Please type ID" hasFeedback>
          <Input name="taiKhoan" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mật khẩu" hasFeedback>
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
          <Select
            placeholder="Chọn loại người dùng"
            name="maLoaiNguoiDung"
            onChange={handleChangeFeild}
          >
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

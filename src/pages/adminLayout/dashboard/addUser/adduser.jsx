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
  const [form] = Form.useForm();
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
          navigate("/admin/dashboard");
        }
      } catch (error) {
        notification.error({
          message: error.response.data.content,
        });
      }
    },
  });
  const handleChangeFeild = (value) => {
    console.log(value);
    formik.setFieldValue("maLoaiNguoiDung", value);
  };
  return (
    <div className="pr-10">
      <Form
        {...formItemLayout}
        onSubmitCapture={formik.handleSubmit}
        form={form}
      >
        <h3 className="text-center pb-4">Thêm người dùng</h3>
        <Form.Item
          name="email"
          label="E-mail"
          tooltip="Ex: name123@gmail.com"
          hasFeedback
          onChange={formik.handleChange}
          validateTrigger={["onBlur"]}
          rules={[
            { required: true, message: "Email không được bỏ trống" },
            { type: "email", message: "Sai định dạng email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="taiKhoan"
          label="Tài khoản"
          tooltip="Please type ID"
          hasFeedback
          onChange={formik.handleChange}
          validateTrigger={["onBlur"]}
          rules={[
            { required: true, message: "Tên không được bỏ trống" },
            {
              pattern: "^[A-Za-z0-9]{5,}$",
              message: "Tài khoản gồm chữ không dấu và số, từ 5 tới 10 ký tự ",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="matKhau"
          label="Mật khẩu"
          hasFeedback
          tooltip="Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số"
          validateTrigger={["onBlur"]}
          onChange={formik.handleChange}
          rules={[
            { required: true, message: "Mật khẩu không được bỏ trống" },
            {
              pattern: "^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$",
              message: "Mật khẩu chưa đúng ",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="hoTen"
          label="Họ và tên"
          tooltip="Tên có dấu không bao gồm số"
          hasFeedback
          validateTrigger={["onBlur"]}
          onChange={formik.handleChange}
          rules={[
            {
              required: true,
              message: "Tên không được để trống",
            },
            {
              pattern:
                "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
              message: "Tên sai định dạng",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="soDt"
          onChange={formik.handleChange}
          hasFeedback
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Số điện thoại không được để trống",
            },
            {
              pattern:
                "^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$",
              message: "Số điện thoại phải gồm 10 số",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          label="Loại người dùng"
          name="maLoaiNguoiDung"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Loại người dùng không để trống",
            },
          ]}
        >
          <Select
            placeholder="Chọn loại người dùng"
            onChange={handleChangeFeild}
          >
            <Option value="QuanTri">Quản Trị</Option>
            <Option value="KhachHang">Khách hàng</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailFormItemLayout} shouldUpdate>
          {() => {
            return (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched() ||
                  form.getFieldsError().some((ele) => ele.errors.length > 0)
                }
              >
                Đăng ký
              </Button>
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
}

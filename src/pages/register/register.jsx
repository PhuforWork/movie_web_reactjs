import { notification } from "antd";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GROUP_ID } from "../../constants/common";
import { fetchAddUserApi, fetchRegisterApi } from "../../services/quanlyuser";

export default function Register() {
  const navigate = useNavigate();
  const [regis, setRegis] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    hoTen: "",
  });
  const [errorList, setErrorList] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegis({
      ...regis,
      [name]: value,
      maNhom: GROUP_ID,
    });
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log(regis);
    try {
      const result = await fetchRegisterApi(regis);
      if (result.data.content) {
        notification.warning({
          message: "Đăng ký thành công",
        });
        navigate("/adminguards/login");
      }
    } catch (error) {
      notification.error({
        message: error.response.data.content,
      });
    }
  };
  const handleBlur = (event) => {
    const {
      name,
      title,
      minLength,
      maxLength,
      validationMessage,
      validity: { valueMissing, patternMismatch, tooLong, tooShort },
    } = event.target;
    let messError = "";
    if (patternMismatch) {
      messError = `${title} sai cú pháp`;
    }
    if (tooShort || tooShort) {
      messError = `${title} phải từ ${minLength} tới ${maxLength} ký tự`;
    }

    if (valueMissing) {
      messError = `${title} không được để trống `;
    }
    setErrorList({
      ...errorList,
      [name]: messError,
    });
  };
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <NavLink
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#d46b08"
            viewBox="0 0 32 32"
            className="w-8 h-8 dark:text-violet-100"
          >
            <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
            <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z"></path>
          </svg>
          CyberMovie
        </NavLink>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create and account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleOnSubmit}
              noValidate
            >
              <div>
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your full name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="hoTen"
                  pattern={
                    "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
                  }
                  title="Họ tên"
                  id="fullname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Type name here"
                  required
                  onBlur={handleBlur}
                />
                {errorList.hoTen && (
                  <span className="text-danger">{errorList.hoTen}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  onChange={handleChange}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
                  type="email"
                  title="Email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                  onBlur={handleBlur}
                />
                {errorList.email && (
                  <span className="text-danger">{errorList.email}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="taikhoan"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  ID
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="taiKhoan"
                  title="Tài khoản"
                  id="taikhoan"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name123"
                  required
                  minLength={5}
                  maxLength={16}
                  pattern="^[A-Za-z0-9]{5,}$"
                  onBlur={handleBlur}
                />
                {errorList.taiKhoan && (
                  <span className="text-danger">{errorList.taiKhoan}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="matKhau"
                  title="Mật khẩu"
                  id="password"
                  pattern="^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                  onBlur={handleBlur}
                />
                {errorList.matKhau && (
                  <span className="text-danger">{errorList.matKhau}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="number"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone number
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="soDt"
                  title="Số điện thoại"
                  id="number"
                  maxLength={10}
                  pattern="^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$"
                  placeholder="090 xxx xxx"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                  onBlur={handleBlur}
                />
                {errorList.soDt && (
                  <span className="text-danger">{errorList.soDt}</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-cyan-400 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500  ">
                Already have an account?{" "}
                <NavLink
                  to="/adminguards/login"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Login here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import locale from "antd/lib/date-picker/locale/vi_VN";
import { useFormik } from "formik";
import "moment/locale/vi";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GROUP_ID } from "../../../../constants/common";
import { useAsync } from "../../../../hooks/useAsync";
import {
  fetchAddMovieUploadPicApi,
  fetchCapNhatPhimUpload,
  fetchGetInfoMovieApi,
} from "../../../../services/quanlyphim";
import { GET_INFO_MOVIE } from "../../../../store/types/name.type";

export default function AddFilms() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: async (values) => {
      let formData = new FormData();
      // console.log(values);
      // console.log(formData);
      values.maNhom = GROUP_ID;

      for (const key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      // console.log(formData);
      try {
        await fetchAddMovieUploadPicApi(formData);
        notification.success({
          message: "Thêm phim thành công",
        });
        navigate("/admin/films");
      } catch (error) {
        notification.error({
          message: error.response.data.content,
        });
      }
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleChangeDate = (event) => {
    let ngaykhoichieu = moment(event).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngaykhoichieu);
  };
  const handleChangField = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangFile = (event) => {
    // lay file
    let file = event.target.files[0];
    // console.log(file);
    // doc file
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === " image/png"
    ) {
      // tạo đối tượng đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        // console.log(event.target.result);
        setImgSrc(event.target.result);
      };
    }
    // lưu vào formik
    formik.setFieldValue("hinhAnh", file);
  };

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      // initialValues={{
      //   size: componentSize,
      // }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên Phim">
        <Input name="tenPhim" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name="trailer" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input name="moTa" onChange={formik.handleChange} />
      </Form.Item>

      <Form.Item label="Ngày khởi chiếu">
        <DatePicker
          locale={locale}
          onChange={handleChangeDate}
          format="DD/MM/YYYY"
        />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangField("sapChieu")} />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch onChange={handleChangField("dangChieu")} />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch
          onChange={handleChangField("hot")}
          checked={formik.values.hot}
        />
      </Form.Item>
      <Form.Item label="Số sao">
        <InputNumber onChange={handleChangField("danhGia")} min={1} max={10} />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input
          type="file"
          name="hinhAnh"
          onChange={handleChangFile}
          accept="image/png, image/jpeg, image/jpg, image/gif"
        />
        <img
          src={imgSrc}
          style={
            imgSrc
              ? { width: 300, height: 400, paddingTop: 10 }
              : { paddingTop: 10 }
          }
          alt="..."
        />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Thêm phim
        </button>
      </Form.Item>
    </Form>
  );
}

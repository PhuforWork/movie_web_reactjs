import {
  AppstoreAddOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { notification, Table } from "antd";
import React, { Fragment, useState } from "react";
import { Input, Space, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GET_LIST_USER } from "../../../store/types/name.type";
import { NavLink, useNavigate } from "react-router-dom";
import { useAsync } from "../../../hooks/useAsync";
import {
  fetchDeleteUserApi,
  fetchTakeListUser,
} from "../../../services/quanlyuser";

export default function DashboardManager() {
  const { userListInfo } = useSelector((state) => state.quanlyUserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadings, setLoadings] = useState([]);
  // console.log(userListInfo);
  const { state: userInfoList } = useAsync({
    dependancies: [],
    service: () => fetchTakeListUser(),
  });
  useEffect(() => {
    dispatch({
      type: GET_LIST_USER,
      payload: userInfoList,
    });
  }, [userInfoList]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        navigate("/admin/adduser");
        return newLoadings;
      });
    }, 100);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      width: 50,
      render: (text) => {
        return <span>{text}</span>;
      },
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      // sorter: (a, b) => a.maPhim - b.maPhim,
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      defaultSortOrder: "descend",
      width: 120,
      render: (text) => {
        return <p className="font-bold">{text}</p>;
      },
      sorter: (a, b) => {
        if (a.taiKhoan.toLowerCase().trim() > b.taiKhoan.toLowerCase().trim()) {
          return 1;
        } else {
          return -1;
        }
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      width: 120,
      render: (text) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      width: 200,
      render: (text) => {
        return <p>{text}</p>;
      },
      sorter: (a, b) => {
        if (a.hoTen.toLowerCase().trim() > b.hoTen.toLowerCase().trim()) {
          return 1;
        } else {
          return -1;
        }
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, object) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Số điện thoại ",
      dataIndex: "soDt",
      render: (text, object) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      render: (text, object) => {
        return <p>{text}</p>;
      },
      filters: [
        {
          text: "Khách Hàng",
          value: "KhachHang",
        },
        {
          text: "Quản Trị",
          value: "QuanTri",
        },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung.indexOf(value) === 0,
    },
    {
      title: "Thao tác",
      dataIndex: "thaoTac",
      width: 120,
      render: (text, object) => {
        // console.log(object);
        return (
          <div className="flex items-center">
            <NavLink
              to={`/admin/edituser/${object.taiKhoan}`}
              className="flex items-center py-2 px-2 focus:outline-none text-blue-400 hover:text-white hover:bg-cyan-400  ml-2 font-semibold rounded-md"
            >
              <EditOutlined style={{ display: "flex", alignItems: "center" }} />
            </NavLink>

            <span
              style={{ cursor: "pointer" }}
              onClick={async () => {
                if (
                  window.confirm(
                    `Bạn có chắc muốn xóa người dùng ${object.hoTen}`
                  )
                ) {
                  try {
                    await fetchDeleteUserApi(object.taiKhoan);
                    const result = await fetchTakeListUser();
                    dispatch({
                      type: GET_LIST_USER,
                      payload: result.data.content,
                    });
                    if (result.data.content) {
                      notification.success({
                        message: "Xóa người dùng thành công",
                      });
                    }
                  } catch (error) {
                    notification.error({
                      message: error.response.data.content,
                    });
                  }
                }
              }}
              className="flex items-center py-2 px-2 focus:outline-none text-red-500 hover:text-white hover:bg-red-500 ml-2 font-semibold rounded-md"
            >
              <DeleteOutlined
                style={{ display: "flex", alignItems: "center" }}
              />
            </span>
          </div>
        );
      },
    },
  ];

  const data = userListInfo.map((ele, index) => {
    return {
      key: index + 1,
      hoTen: ele.hoTen,
      maLoaiNguoiDung: ele.maLoaiNguoiDung,
      matKhau: ele.matKhau,
      soDt: ele.soDT,
      taiKhoan: ele.taiKhoan,
      email: ele.email,
    };
  });
  // const data = "";
  // console.log(data);
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  const { Search } = Input;

  const onSearch = async (value) => {
    const result = await fetchTakeListUser(value);
    dispatch({
      type: GET_LIST_USER,
      payload: result.data.content,
    });
  };

  return (
    <Fragment>
      <Space
        direction="vertical"
        className="w-full my-3"
        style={{
          width: "100%",
        }}
      >
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 15px",
          }}
          type="primary"
          icon={<AppstoreAddOutlined />}
          loading={loadings[1]}
          onClick={() => {
            enterLoading(1);
          }}
        >
          Thêm người dùng
        </Button>
        <Search
          style={{
            display: "flex",
            alignItems: "center",
          }}
          placeholder="Search name movie"
          onSearch={onSearch}
          enterButton={
            <SearchOutlined style={{ display: "flex", alignItems: "center" }} />
          }
        />
      </Space>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </Fragment>
  );
}

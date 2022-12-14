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
import { SET_MOVIELIST } from "../../../store/types/name.type";
import { useAsync } from "../../../hooks/useAsync";
import {
  fetchDeleteMovieApi,
  fetchMovieListApi,
} from "../../../services/quanlyphim";
import { NavLink, useNavigate } from "react-router-dom";

export default function FilmsManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movieInfoDefault } = useSelector(
    (state) => state.danhsachphimReducer
  );

  const { state: movieInfoList } = useAsync({
    dependancies: [],
    service: () => fetchMovieListApi(),
  });

  useEffect(() => {
    // console.log(123);
    dispatch({
      type: SET_MOVIELIST,
      payload: movieInfoList,
    });
  }, [movieInfoList]);

  const [loadings, setLoadings] = useState([]);
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
        navigate("/admin/addfilms");
        return newLoadings;
      });
    }, 100);
  };

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      width: 120,
      render: (text, object) => {
        // console.log(text);
        return <span>{text}</span>;
      },
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      defaultSortOrder: "descend",
      width: 120,
      render: (text, object) => {
        return <img src={text} alt={object.tenPhim} width={50} height={50} />;
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      width: 300,
      render: (text) => {
        return <p style={{ fontWeight: "bold" }}>{text}</p>;
      },
      sorter: (a, b) => {
        if (a.tenPhim.toLowerCase().trim() > b.tenPhim.toLowerCase().trim()) {
          return 1;
        } else {
          return -1;
        }
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text, object) => {
        return (
          <p>
            {object.moTa.length > 50
              ? object.moTa.substr(0, 50) + "..."
              : object.moTa}
          </p>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      width: 120,
      render: (text, object) => {
        return (
          <div className="flex items-center">
            <NavLink
              to={`/admin/editfilms/${object.maPhim}`}
              className="flex items-center py-2 px-2 focus:outline-none text-blue-400 hover:text-white hover:bg-cyan-400  ml-2 font-semibold rounded-md"
            >
              <EditOutlined style={{ display: "flex", alignItems: "center" }} />
            </NavLink>

            <span
              style={{ cursor: "pointer" }}
              onClick={async () => {
                if (
                  window.confirm(`Bạn có chắc muốn xóa phim ${object.tenPhim}`)
                ) {
                  await fetchDeleteMovieApi(object.maPhim);
                  const result = await fetchMovieListApi();
                  dispatch({
                    type: SET_MOVIELIST,
                    payload: result.data.content,
                  });
                  notification.success({
                    message: "Xóa phim thành công",
                  });
                }
              }}
              className="flex items-center py-2 px-2 focus:outline-none text-red-500 hover:text-white hover:bg-red-500 ml-2 font-semibold rounded-md"
            >
              <DeleteOutlined
                style={{ display: "flex", alignItems: "center" }}
              />
            </span>
            <NavLink
              to={`/admin/showtime/${object.maPhim}/${object.tenPhim}`}
              onClick={() => {
                localStorage.setItem("FilmsParams", JSON.stringify(object));
              }}
              className="flex items-center py-2 px-2 focus:outline-none text-amber-500 hover:text-white hover:bg-amber-500  ml-2 font-semibold rounded-md"
            >
              <CalendarOutlined
                style={{ display: "flex", alignItems: "center" }}
              />
            </NavLink>
          </div>
        );
      },
    },
  ];

  const data = movieInfoDefault.map((ele, index) => {
    return {
      key: index,
      maPhim: ele.maPhim,
      tenPhim: ele.tenPhim,
      moTa: ele.moTa,
      hinhAnh: ele.hinhAnh,
    };
  });

  // console.log(data);
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  const { Search } = Input;

  const onSearch = async (value) => {
    const result = await fetchMovieListApi(value);
    dispatch({
      type: SET_MOVIELIST,
      payload: result.data.content,
    });
    console.log(result);
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
          Thêm phim
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

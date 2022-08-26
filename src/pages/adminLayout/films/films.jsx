import { AppstoreAddOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React, { Fragment, useState } from "react";
// import { AudioOutlined } from "@ant-design/icons";
import { Input, Space, Button } from "antd";
import "./films.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { SET_MOVIELIST } from "../../../store/types/name.type";
import { useAsync } from "../../../hooks/useAsync";
import { fetchMovieListApi } from "../../../services/danhsachphim";

export default function FilmsManager() {
  const dispatch = useDispatch();
  const { movieInfoDefault } = useSelector(
    (state) => state.danhsachphimReducer
  );
  console.log(movieInfoDefault);
  const { state: movieInfo } = useAsync({
    dependancies: [],
    service: () => fetchMovieListApi(),
  });
  useEffect(() => {
    dispatch({
      type: SET_MOVIELIST,
      payload: movieInfo,
    });
  }, [movieInfo]);

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
        return newLoadings;
      });
    }, 1000);
  };

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      width:120,
      render: (text, object) => {
        console.log(text);
        return <span>{text}</span>;
      },
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend"],
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      defaultSortOrder: "descend",
      width:120,
      render:(text,object)=>{return<img src={text} alt={object.tenPhim} width={50} height={50}/>},
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      width:300,
      render:(text)=>{return<p style={{fontWeight:"bold"}}>{text}</p>},
      sorter: (a, b) => a.tenPhim.length - b.tenPhim.length,
      sortDirections: ["descend","ascend"],
    },
    {
      title: "Mo ta",
      dataIndex: "moTa",
      render:(text)=>{return<p>{text}</p>},
    },

  ];


  const data = movieInfoDefault.map((ele, index) => {
    return {
      key: index,
      maPhim: ele.maPhim,
      tenPhim: ele.tenPhim,
      moTa:ele.moTa,
      hinhAnh:ele.hinhAnh

    }
  });

  // console.log(data);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const { Search } = Input;

  const onSearch = (value) => console.log(value);

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
          className=""
          type="primary"
          icon={<AppstoreAddOutlined />}
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
        >
          Thêm phim
        </Button>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          // suffix={suffix}
          enterButton
        />
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey="Id"
      />
    </Fragment>
  );
}

// import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Details from "../../pages/details/details";

export default function ButtonLoading(props) {
  const [loadings, setLoadings] = useState([]);
  const navigate = useNavigate();
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
        if (newLoadings[0] === false) {
          navigate(`/details/${props.maPhim}`);
        }
        return newLoadings;
      });
    }, 1000);
  };
  return (
    <div style={{ width: 160 }}>
      <Space
        style={{
          width: "100%",
        }}
      >
        <Button
          type="primary"
          style={{ backgroundColor: "#52c41a", border: "1px solid #52c41a" }}
          loading={loadings[0]}
          onClick={() => {
            enterLoading(0);
            
          }}
        >
          Đặt vé
        </Button>
        <Button
          type="primary"
          style={{ backgroundColor: "#d48806", border: "1px solid #d48806" }}
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
        >
          Trailer
        </Button>
      </Space>
    </div>
  );
}

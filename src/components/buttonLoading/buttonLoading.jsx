// import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Space, Modal } from "antd";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import Details from "../../pages/details/details";
import "./Modal.scss";
export default function ButtonLoading(props) {
  const [loadings, setLoadings] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
          Chi tiết
        </Button>
        <Button
          type="primary"
          style={{ backgroundColor: "#d48806", border: "1px solid #d48806" }}
          loading={loadings[1]}
          onClick={() => {
            showModal();
            enterLoading(1);
          }}
        >
          Trailer
        </Button>
        {isModalVisible ? (
          <Modal
            footer={null}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div>
              <ReactPlayer
                url={props.trailer}
                playing={true}
                controls
                volume={1}
              />
            </div>
          </Modal>
        ) : null}
      </Space>
    </div>
  );
}

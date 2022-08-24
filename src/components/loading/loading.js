import React, { Fragment } from "react";
import "./loading.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function Loading() {
  const { isLoading } = useSelector((state) => state.loadingReducer);
  return (
    <Fragment>
      {isLoading ? (
        <div className="style-loading">
          <div className="text-2xl">
            <LoadingOutlined className="loading-icons" />
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}

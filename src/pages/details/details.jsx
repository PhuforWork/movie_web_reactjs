import { Radio, Space, Tabs } from "antd";
import React, { useState } from "react";
import "./details.scss";

export default function Details() {
  const { TabPane } = Tabs;

  return (
    <div className="container-1">
      <div className="filter">
        <div className="grid grid-cols-12">
          <div className="col-span-4 col-start-4 component-1">
            <div className="grid grid-cols-2">
              <img className="" src="https://picsum.photos/200/350" alt="" />
              <div>
                <h1>Ten phim</h1>
                <p>mo ta</p>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="c100 p50 big">
              <span>50%</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 ">
          <div className="col-span-8 col-start-3">
            <Tabs tabPosition="left">
              <TabPane tab="Tab 1" key="1">
                Content of Tab 1
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                Content of Tab 2
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                Content of Tab 3
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

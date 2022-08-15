import {  Tabs } from "antd";
import React, { useState } from "react";
const { TabPane } = Tabs;

export default function HomeMenu() {
  const [tabPosition, setTabPosition] = useState("left");

  return (
    <div>
      <Tabs tabPosition={tabPosition}>
        <TabPane
          tab={
            <img
              src="https://source.unsplash.com/200x200/?fashion?1"
              className="rounded-full"
              alt="pic"
              style={{ width: "30px", height: "30px" }}
            />
          }
          key="1"
        >
          Content of Tab 1
        </TabPane>
        <TabPane
          tab={
            <img
              src="https://source.unsplash.com/200x200/?fashion?2"
              className="rounded-full"
              alt="pic"
              style={{ width: "30px", height: "30px" }}
            />
          }
          key="2"
        >
          Content of Tab 2
        </TabPane>
        <TabPane
          tab={
            <img
              src="https://source.unsplash.com/200x200/?fashion?3"
              className="rounded-full"
              alt="pic"
              style={{ width: "30px", height: "30px" }}
            />
          }
          key="3"
        >
          Content of Tab 3
        </TabPane>
      </Tabs>
    </div>
  );
}

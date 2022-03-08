import React from "react";
import ReactDOM from "react-dom";
import { Button } from "@alicloud/console-components";
import AppLayout from "@alicloud/console-components-app-layout";
import ConsoleMenu from "@alicloud/console-components-console-menu";

import "./styles.css";
import "@alicloud/console-components/dist/wind.css";

const menuItems = [
  {
    key: "overview",
    label: "概览"
  },
  {
    key: "lists",
    label: "列表",
    items: [
      {
        key: "basic-list-1",
        label: "基础列表1"
      },
      {
        key: "basic-list-2",
        label: "基础列表2"
      }
    ]
  },
  {
    key: "basic-form",
    label: "基础表单"
  }
];

function App() {
  return (
    <div className="App">
      <AppLayout nav={<ConsoleMenu items={menuItems} />}>
        页面内容：
        <Button type="primary">使用Button</Button>
      </AppLayout>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

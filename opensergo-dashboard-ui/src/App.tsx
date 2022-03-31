import React from 'react';
import './App.css';
import ConsoleMenu from "@alicloud/console-components-console-menu";
import {Button, Message} from "@alicloud/console-components";
import AppLayout from "@alicloud/console-components-app-layout";
import Page from '@alicloud/console-components-page'


import "@alicloud/console-components/dist/wind.css";
import {Link, Switch, Route} from "dva/router";
import AppList from "./AppList";

const Nav = () => (
    <ConsoleMenu>
        {/*<ConsoleMenu.Item key="aaaa"><Link to="/a">aaaa</Link></ConsoleMenu.Item>*/}
        <ConsoleMenu.Item key="AppList"><Link to="/AppList">应用列表</Link></ConsoleMenu.Item>
        {/*<ConsoleMenu.SubMenu key="log" label="日志">*/}
        {/*    <ConsoleMenu.Item key="access-log">访问日志</ConsoleMenu.Item>*/}
        {/*    <ConsoleMenu.Item key="load-log">负载日志</ConsoleMenu.Item>*/}
        {/*</ConsoleMenu.SubMenu>*/}
        {/*<ConsoleMenu.Item key="help">产品帮助</ConsoleMenu.Item>*/}
        {/*<ConsoleMenu.Item key="api-docs">API 文档</ConsoleMenu.Item>*/}
    </ConsoleMenu>
);

function App() {
    return (
        <AppLayout
            nav={<Nav/>}
        >
            <Switch>
                <Route path="/AppList">
                    <AppList/>
                </Route>
            </Switch>
        </AppLayout>
    );
}

export default App;

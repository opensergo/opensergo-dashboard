import React from 'react';
import './App.css';
import {IRoutableItemDescriptor} from "@alicloud/console-components-console-menu";
import RoutableMenu from "@alicloud/console-components-console-menu/lib/RoutableMenu";
import AppLayout from "@alicloud/console-components-app-layout";


import "@alicloud/console-components/dist/wind.css";
import {Redirect, Route, Switch} from "dva/router";
import AppList from "./AppList";


const items: IRoutableItemDescriptor[] = [
    // {key: '/home', to: '/', label: '概览'},
    {key: '/application', to: '/application', label: '应用列表'},
];

const Nav = () => (
    <RoutableMenu
        items={items}
        defaultActiveKey={'/application'}
    />
);

function App() {
    return (
        <AppLayout
            nav={<Nav/>}
        >
            <Switch>
                <Route path="/application">
                    <AppList/>
                </Route>
                <Route path="/">
                    <Redirect to={'/application'}/>
                </Route>
            </Switch>
        </AppLayout>
    );
}

export default App;

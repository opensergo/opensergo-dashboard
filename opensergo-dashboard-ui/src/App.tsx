import React from 'react';
import './App.css';
import {IRoutableItemDescriptor} from "@alicloud/console-components-console-menu";
import RoutableMenu from "@alicloud/console-components-console-menu/lib/RoutableMenu";
import AppLayout from "@alicloud/console-components-app-layout";


import "@alicloud/console-components/dist/wind.css";
import {Redirect, Route, Switch} from "dva/router";
import AppList from "./AppList";
import AppDetail from "./page/AppDetail";


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
        <Switch>
            <Route path="/application/:appName">
                <AppDetail />
            </Route>
            <Route path="/">
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

            </Route>
        </Switch>
    );
}

export default App;

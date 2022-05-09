import './App.css';
import { IRoutableItemDescriptor } from "@alicloud/console-components-console-menu";
import RoutableMenu from "@alicloud/console-components-console-menu/lib/RoutableMenu";
import AppLayout from "@alicloud/console-components-app-layout";


import "@alicloud/console-components/dist/wind.css";
import { Redirect, Route, Switch } from "dva/router";
import AppList from "./AppList";
import AppDetail from "./page/AppDetail";
import Integration from './page/Integration';


const items: IRoutableItemDescriptor[] = [
    // {key: '/home', to: '/', label: '概览'},
    { key: '/application', to: '/application', label: '应用列表' },
    { key: '/integration', to: '/integration', label: '接入中心' },
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
            nav={<Nav />}
        >
            <Switch>
                <Route path="/application/detail">
                    <AppDetail />
                </Route>
                <Route path="/application/service">
                    <AppDetail />
                </Route>
                <Route exact path="/application">
                    <AppList />
                </Route>
                <Route exact path="/application">
                    <AppList />
                </Route>
                <Route exact path="/integration">
                    <Integration />
                </Route>
                <Route path="/">
                    <Redirect to={'/application'} />
                </Route>
            </Switch>
        </AppLayout>
    );
}

export default App;

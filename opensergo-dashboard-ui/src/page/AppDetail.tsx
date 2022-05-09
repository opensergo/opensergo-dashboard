import React, { useEffect, useState } from "react";
import axios from "axios";
import { router } from 'dva';
import { Tab } from "@alicloud/console-components";
import { Redirect, Route, Switch } from "dva/router";

import { IRoutableItemDescriptor } from "@alicloud/console-components-console-menu";
import RoutableMenu from "@alicloud/console-components-console-menu/lib/RoutableMenu";
import Page from "@alicloud/console-components-page";
import Table from "@alicloud/console-components-table";
import { Badge, Button } from "@alicloud/console-components";
import { LinkButton } from "@alicloud/console-components-actions";
import { Icon, Card } from "@alicloud/console-components";
import { Menu } from '@alicloud/console-components'
import { Nav, Radio } from '@alicloud/console-components'
const { Item, SubNav } = Nav

import { Grid } from '@alicloud/console-components'
import RpcServiceList from "../component/RpcServiceList";

const { Row, Col } = Grid

function useQuery() {
    const { search } = router.useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const AppDetail: React.FC<{}> = () => {
    let query = useQuery();
    const currentAppName = query.get('appName') || "";
    const history = router.useHistory();


    const items: IRoutableItemDescriptor[] = [
        { key: '/application/detail', to: `/application/detail?appName=${currentAppName}`, label: '应用详情' },
        { key: '/application/service', to: `/application/service?appName=${currentAppName}`, label: '接口详情' },
    ];
    const Nav = () => (
        <RoutableMenu
            items={items}
            defaultActiveKey={'/application/detail'}
        />
    );
    const Nav2 = () => (
        <Page.Menu defaultOpenKeys="/application" selectedKeys={"/application"} selectMode="single">
            <Page.Menu.Item key="/application">
                <router.NavLink to={`/application/${currentAppName}/`}>应用详情</router.NavLink>
            </Page.Menu.Item>
            <Item key="/application/service">
                <router.NavLink to={`/application/${currentAppName}/service`}>接口详情</router.NavLink>
            </Item>
            {/* <Menu.Divider key="divider" />
            <Menu.Group label="Group">
                <Menu.Item key="group-1">Group option 1</Menu.Item>
                <Menu.Item key="group-2">Group option 2</Menu.Item>
            </Menu.Group>
            <Menu.Divider />
            <Menu.SubMenu key="sub-menu" label="Sub menu">
                <Menu.Item key="sub-1">Sub option 1</Menu.Item>
                <Menu.Item key="sub-2">Sub option 2</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="3" helper="CTRL+P">
                Option 3
            </Menu.Item> */}
        </Page.Menu>
    );

    const [appItem, setAppItem] = useState<{ appName?: string, sha256?: string }>({});
    useEffect(() => {
        describeApplication();
    }, []);

    const describeApplication = async () => {
        const data = await axios.get('/api/application/describeApplication', { params: { appName: currentAppName } })
            .then(function (response) {
                return response?.data?.data;
            });
        setAppItem(data);
    };

    return (
        <Page>
            <Page.Header
                hasBackArrow
                onBackArrowClick={() => {
                    history.push('/application');
                }}
                title={currentAppName}/>
            <Page.Content menu={<Nav />}>
                <Switch>
                    <Route path="/application/service">
                        <Tab
                            shape="wrapped"
                            triggerType="click"
                        >
                            <Tab.Item title={"gRPC"} key={"tab3"}>
                                <RpcServiceList
                                    appName={currentAppName}
                                    protocol={"grpc"}
                                />
                            </Tab.Item>
                            {/* <Tab.Item title={"协议4"} key={"tab4"}>
                                tab.content4
                            </Tab.Item> */}
                        </Tab>
                    </Route>
                    <Route path="/application/detail">
                        <Card title="基础信息" >
                            <Row>
                                <Col span="12">应用名： <span>{appItem.appName}</span></Col>
                                <Col span="12">元信息id：<span>{appItem.sha256}</span></Col>
                            </Row>
                        </Card>
                        {/* <Tab
                            triggerType="click"
                        >
                            <Tab.Item title={"tab1"} key={"tab1"}>
                                tab.content1
                            </Tab.Item>
                            <Tab.Item title={"tab2"} key={"tab2"}>
                                tab.content2
                            </Tab.Item>
                        </Tab> */}
                    </Route>
                    <Route path="service">
                        <div>/application</div>

                        <Table
                            exact
                            fixedBarExpandWidth={[24]}
                            affixActionBar
                            // dataSource={appList}
                            // rowSelection={rowSelection}
                            // primaryKey="appName"
                            // operation={Operation}
                            search={{
                                filter: [
                                    {
                                        value: 'AppName',
                                        label: '应用名称',
                                    },
                                ],
                                defaultValue: 'AppName',
                            }}
                            pagination={{
                                current: 1,
                                total: 80,
                                pageSize: 20,
                            }}
                            selection={({ selectedRowKeys }: any) => (
                                <>
                                    <Badge count={selectedRowKeys.length}>
                                        <Button disabled={selectedRowKeys.length === 0}>
                                            Delete
                                        </Button>
                                    </Badge>
                                </>
                            )}
                        ></Table>
                    </Route>
                    <Route path="/">
                        <Redirect to={`/application/detail?appName=${currentAppName}`} />
                    </Route>
                </Switch>
            </Page.Content>
        </Page>
    )
}

export default AppDetail;

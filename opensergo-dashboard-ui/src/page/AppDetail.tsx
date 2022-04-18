import React, {useEffect, useState} from "react";
import axios from "axios";
import Page from "@alicloud/console-components-page";
import Table from "@alicloud/console-components-table";
import {Badge, Button} from "@alicloud/console-components";
import {LinkButton} from "@alicloud/console-components-actions";

const AppDetail: React.FC<{}> = () => {
    const [appList, setAppList] = useState([]);
    useEffect(() => {
        fetchAppList();
    }, []);
    // 这个是分页接口，但是需要拿到全部数据
    const fetchAppList = async () => {
        const data = await axios.get('/api/application/getApplicationList')
            .then(function (response) {
                return response?.data?.data;
            });
        setAppList(data);
    };

    return (
        <Page>
            <Page.Header title="应用列表"/>
            <Page.Content>
                <Table
                    exact
                    fixedBarExpandWidth={[24]}
                    affixActionBar
                    dataSource={appList}
                    primaryKey="appName"
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
                    selection={({selectedRowKeys}: any) => (
                        <>
                            <Badge count={selectedRowKeys.length}>
                                <Button disabled={selectedRowKeys.length === 0}>
                                    Delete
                                </Button>
                            </Badge>
                        </>
                    )}
                >
                    <Table.Column title="应用名" cell={render} width={200}/>
                </Table>
            </Page.Content>
        </Page>
    )
}


const render = (value :any, index:any, record:any) => {
    console.log(value, index, record);
    return (
        <LinkButton
            href={`https://baidu.com`}
            // onClick={() => {
            //     alert("on click");
            // }}
        >
            {record.appName}
        </LinkButton>
    )
}

export default AppDetail;
import React, {useEffect, useState} from 'react'
import {Badge, Button} from '@alicloud/console-components'
import ConsoleMenu from '@alicloud/console-components-console-menu'
import Page from '@alicloud/console-components-page'
import Table from '@alicloud/console-components-table'
import type {TableProps} from '@alicloud/console-components/types/table'
import axios from 'axios';

const columns = [
    {
        dataIndex: 'appName',
        title: '应用名',
    }
]

const rowSelection: TableProps['rowSelection'] & {
    UNSTABLE_defaultSelectedRowKeys?: any[]
} = {
    getProps: (item: any, i: number) => ({disabled: false}),
    UNSTABLE_defaultSelectedRowKeys: [1, 2],
    mode: 'multiple',
}

const Operation = () => (
    <>
        <Button type="primary">
            应用接入
        </Button>
        <Button>刷新</Button>
    </>
)

const AppList: React.FC<{}> = () => {
    const [appList, setAppList] = useState([]);
    useEffect(() => {
        fetchAppList();
    },[]);
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
                    columns={columns}
                    rowSelection={rowSelection}
                    primaryKey="appName"
                    operation={Operation}
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
                />
            </Page.Content>
        </Page>
    )
}

export default AppList;

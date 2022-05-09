import React, { useEffect, useState } from 'react';
import { Button } from '@alicloud/console-components';
import { LinkButton } from "@alicloud/console-components-actions";
import Page from '@alicloud/console-components-page';
import Table from '@alicloud/console-components-table';
import type { TableProps } from '@alicloud/console-components/types/table';
import axios from 'axios';
import { Link, useHistory } from 'dva/router'


const rowSelection: TableProps['rowSelection'] & {
    UNSTABLE_defaultSelectedRowKeys?: any[]
} = {
    getProps: (item: any, i: number) => ({ disabled: false }),
    UNSTABLE_defaultSelectedRowKeys: [1, 2],
    mode: 'multiple',
}

const AppList: React.FC<{}> = () => {
    const history = useHistory();

    const [loading, setLoading] = useState(true);

    const [appList, setAppList] = useState([]);
    useEffect(() => {
        fetchAppList();
    }, []);
    // TODO need to support paging
    const fetchAppList = async () => {
        setLoading(true);
        const data = await axios.get('/api/application/getApplicationList')
            .then(function (response) {
                return response?.data?.data;
            });
        setAppList(data);
        setLoading(false);
    };

    const Operation = () => (
        <>
            <Button
                onClick={() => {
                    history.push("/integration");
                }}
            >
                应用接入
            </Button>
            <Button onClick={fetchAppList}>刷新</Button>
        </>
    )

    return (
        <Page>
            <Page.Header title="应用列表" />
            <Page.Content>
                <Table
                    loading={loading}
                    exact
                    fixedBarExpandWidth={[24]}
                    affixActionBar
                    dataSource={appList}
                    //rowSelection={rowSelection}
                    primaryKey="appName"
                    operation={Operation}
                    search={{
                        filter: [
                            {
                                value: 'appName',
                                label: '应用名称',
                            },
                        ],
                        defaultFilterValue: 'appName',
                    }}
                // pagination={{
                //     current: 1,
                //     total: 80,
                //     pageSize: 20,
                // }}
                // selection={({ selectedRowKeys }: any) => (
                //     <>
                //         <Badge count={selectedRowKeys.length}>
                //             <Button disabled={selectedRowKeys.length === 0}>
                //                 Delete
                //             </Button>
                //         </Badge>
                //     </>
                // )}
                >
                    <Table.Column title="应用名" cell={render} width={200} />
                </Table>
            </Page.Content>
        </Page>
    )
}


const render = (value: any, index: any, record: any) => {
    return (
        <LinkButton
            Component={Link} to={`/application/detail?appName=${record.appName}`}
        >
            {record.appName}
        </LinkButton>
    )
}

export default AppList;

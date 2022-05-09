import Table from '@alicloud/console-components-table';
import axios from "axios";
import React, { useEffect, useState } from "react";

import Actions, { LinkButton } from "@alicloud/console-components-actions";
import RpcServiceMethodList from './RpcServiceMethodList';


const RpcServiceList: React.FC<{ appName: string, protocol: string }> = ({ appName, protocol }) => {
    const [serviceList, setServiceList] = useState<Array<{ appName?: string, serviceName?: string }>>([]);
    useEffect(() => {
        queryService();
    }, []);

    const queryService = async () => {
        const data = await axios.get('/api/service/queryService', { params: { appName: appName, protocol: protocol } })
            .then(function (response) {
                return response?.data?.data;
            });
        setServiceList(data);
    };
    return (
        <Table
            exact
            fixedBarExpandWidth={[24]}
            affixActionBar
            dataSource={serviceList}
            // rowSelection={rowSelection}
            primaryKey="serviceName"
            search={{
                filter: [
                    {
                        value: 'ServiceName',
                        label: '服务名称',
                    },
                ],
                defaultFilterValue: 'ServiceName',
            }}
            pagination={{
                current: 1,
                total: 80,
                pageSize: 20,
            }}
            expandedRowRender={(record) => {
                let servieName = record.serviceName;
                return (
                    <RpcServiceMethodList
                        appName={appName}
                        protocol={protocol}
                        serviceName={servieName}
                    />
                )
            }}
        >
            <Table.Column title="" cell={render} />
        </Table>
    )
}


const render = (value: any, index: any, record: any) => {
    return (
        <>
            <LinkButton
                to={`/application/${record.appName}`}
            >
                {record.serviceName}
            </LinkButton>
        </>
    )
}

export default RpcServiceList;

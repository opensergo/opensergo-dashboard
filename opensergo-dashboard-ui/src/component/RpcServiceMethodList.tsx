import Table from '@alicloud/console-components-table';
import axios from "axios";
import React, { useEffect, useState } from "react";

import Actions, { LinkButton } from "@alicloud/console-components-actions";


const RpcServiceMethodList: React.FC<{ appName: string, protocol: string, serviceName: string }> = ({ appName, protocol, serviceName }) => {
    const [methodList, setMethodList] = useState<Array<{ methodName: string }>>([]);
    useEffect(() => {
        queryService();
    }, []);

    const queryService = async () => {
        const data = await axios.get('/api/service/queryServiceMethod',
            {
                params: {
                    appName: appName,
                    protocol: protocol,
                    serviceName: serviceName,
                }
            }).then(function (response) {
                return response?.data?.data;
            });
        setMethodList(data);
    };
    return (
        <Table
            hasHeader={false}
            hasBorder={false}
            exact
            dataSource={methodList}
            primaryKey="methodName"
        >
            <Table.Column title="" cell={render} />
        </Table>
    )
}


const render = (value: any, index: any, record: any) => {
    return (
        <>
            {record.methodName}
        </>
    )
}

export default RpcServiceMethodList;

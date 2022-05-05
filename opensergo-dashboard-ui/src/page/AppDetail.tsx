import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'dva/router'

import Page from "@alicloud/console-components-page";
import Table from "@alicloud/console-components-table";
import { Badge, Button } from "@alicloud/console-components";
import { LinkButton } from "@alicloud/console-components-actions";


const AppDetail: React.FC<{}> = () => {
    console.log("useParams", useParams);
    const params = useParams();
    console.log("params", params);

    const [appItem, setAppItem] = useState("");
    useEffect(() => {
        fetchAppList();
    }, []);
    // 这个是分页接口，但是需要拿到全部数据
    const fetchAppList = async () => {
        const data = await axios.get('/api/application/describeApplication', { params: { appName: 'example-spring-cloud' } })
            .then(function (response) {
                return response?.data;
            });
        setAppItem(data.appName);
    };

    return (
        <Page>
            <Page.Header title="应用详情" />
            <Page.Content>
                {appItem}
            </Page.Content>
        </Page>
    )
}


const render = (value: any, index: any, record: any) => {
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
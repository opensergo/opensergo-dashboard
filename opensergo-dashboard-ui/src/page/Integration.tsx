import React, { useState } from "react";
import Page from "@alicloud/console-components-page";
import { Grid } from '@alicloud/console-components'
import IntegrationCard from "../component/integration/IntegrationCard";
import kratosLogo from './integration/kratos.png';
import kitexLogo from './integration/kitex.png';
import SlidePanel from '@alicloud/console-components-slide-panel';
const { Row, Col } = Grid

const KratosIntegration: React.FC<{}> = () => {
    const [active, setActive] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    return (
        <>
            <div
                onClick={() => {
                    setActive(true)
                }}
            >
                <IntegrationCard
                    name="Kratos"
                    imgUrl={kratosLogo}
                />
            </div>
            <SlidePanel
                top={50}
                title="接入Kratos应用"
                isShowing={active}
                width="large"
                onClose={() => {
                    setActive(false);
                }}
                isProcessing={isProcessing}
            >
                <a rel="noopener" href="https://opensergo.io/zh-cn/docs/quick-start/quick-start-kratos/" target="_blank">
                    Kratos 快速接入 OpenSergo
                </a>
            </SlidePanel>
        </>
    )
}

const Integration: React.FC<{}> = () => {
    return (
        <Page>
            <Page.Header title="接入中心" />
            <Page.Content>
                <Row wrap>
                    <KratosIntegration />
                    <IntegrationCard
                        name="CloudWeGo-Kitex"
                        imgUrl={kitexLogo}
                        disabled
                    />
                </Row>
            </Page.Content>
        </Page>
    );
}

export default Integration;

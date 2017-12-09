import * as React from "react";
import {Component} from "react";
import {withRouter,Link} from "react-router";
import {Layout, Row, Col,Collapse } from "antd";
const {Content} = Layout;
const Panel = Collapse.Panel;
import {PathConfig} from "../../config/pathconfig";

interface NaConsultingCenterPageProps {

}

interface NaConsultingCenterPageStates {

}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

@withRouter
export class NaConsultingCenterPage extends Component<NaConsultingCenterPageProps, NaConsultingCenterPageStates> {
    constructor(props, context) {
        super(props, context)
    }

    renderContent(){
        return <Row>
            <Collapse accordion>
                <Panel header="包裹的体积、尺寸影响运费吗" key="1">
                    <p>{text}</p>
                </Panel>
                <Panel header="运输保障，包裹出意外如何赔偿" key="2">
                    <p>{text}</p>
                </Panel>
                <Panel header="“专属仓储地址”具体是什么" key="3">
                    <p>{text}</p>
                </Panel>
                <Panel header="什么是仓储式物流，优势是什么" key="4">
                    <p>{text}</p>
                </Panel>
                <Panel header="收货时我应该需要注意哪些事项" key="5">
                    <p>{text}</p>
                </Panel>
                <Panel header="如何尽可能避免或减少进口关税" key="6">
                    <p>{text}</p>
                </Panel>
                <Panel header="怎么邮寄国际快递" key="7">
                    <p>{text}</p>
                </Panel>
                <Panel header="国际快递发送药品注意事项" key="8">
                    <p>{text}</p>
                </Panel>
                <Panel header="寄国际快递哪家便宜？" key="9">
                    <p>{text}</p>
                </Panel>
                <Panel header="各国关税起征点及查询方法" key="10">
                    <p>{text}</p>
                </Panel>
            </Collapse>
        </Row>
    }

    render() {
        const topThis = this;
        return <Layout style={{minHeight: '100%', backgroundColor: '#FFF'}}>
            <Content>
                <Row style={{marginBottom: 24}}>
                    <img style={{maxWidth: '100%'}} src="http://www.famliytree.cn/icon/consulting-center-banner.jpg"/>
                </Row>
                <Row type="flex" justify="space-around" style={{marginBottom: 24}}>
                    <Col xs={22} sm={22} md={18} lg={18} xl={18}>
                        <Row type="flex" justify="space-between"
                             style={{borderBottom: '1px solid #c2c2c2', marginBottom: 24}}>
                            <Col>
                                <h2>常见问题<span style={{paddingLeft: 16, fontSize: 16}}>QUESTIONS</span></h2>
                            </Col>
                            <Col style={{display: 'flex', alignItems: 'center'}}>
                                <Link style={{paddingRight: 5}} to={PathConfig.HomePage}>首页</Link>
                                <Link to={PathConfig.ProcessDemoPage}>常见问题</Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={22} sm={22} md={18} lg={18} xl={18}>
                        {topThis.renderContent()}
                    </Col>
                </Row>
            </Content>
        </Layout>;
    }
}
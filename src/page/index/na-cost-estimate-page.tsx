import * as React from "react";
import {Component} from "react";
import {withRouter,Link} from "react-router";
import {PathConfig} from "../../config/pathconfig";
import {Layout, Row, Col,Form, Input, Button} from "antd";
const {Content} = Layout;
const FormItem = Form.Item;

interface NaCostEstimatePageProps {

}

interface NaCostEstimatePageProps {

}

@withRouter
export class NaCostEstimatePage extends Component<NaCostEstimatePageProps, NaCostEstimatePageProps> {
    constructor(props, context) {
        super(props, context)
    }

    renderContent(){
        const topThis = this;
        return <Row>
            <Col span={12}>
                <Form layout="vertical">
                    <FormItem label="收货国家">
                        <Input  />
                    </FormItem>
                    <FormItem label="重量（kg）公斤">
                        <Input  />
                    </FormItem>
                    <FormItem label="体积（m3）">
                        <Input  />
                    </FormItem>
                    <FormItem>
                        <Button type="primary">开始计算</Button>
                    </FormItem>
                </Form>
            </Col>
            <Col span={12}>

            </Col>
        </Row>
    }

    render() {
        const topThis = this;
        return <Layout style={{minHeight: '100%', backgroundColor: '#FFF'}}>
            <Content>
                <Row style={{marginBottom: 24}}>
                    <img style={{maxWidth: '100%'}} src="http://www.famliytree.cn/icon/process-demo-banner.jpg"/>
                </Row>
                <Row type="flex" justify="space-around">
                    <Col xs={22} sm={22} md={18} lg={18} xl={18}>
                        <Row type="flex" justify="space-between"
                             style={{borderBottom: '1px solid #c2c2c2', marginBottom: 24}}>
                            <Col>
                                <h2>公司简介<span style={{paddingLeft: 16, fontSize: 16}}>COMPANY PROFILE</span></h2>
                            </Col>
                            <Col style={{display: 'flex', alignItems: 'center'}}>
                                <Link style={{paddingRight: 5}} to={PathConfig.HomePage}>首页</Link>
                                <Link to={PathConfig.ProcessDemoPage}>公司简介</Link>
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
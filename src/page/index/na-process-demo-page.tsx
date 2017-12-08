import * as React from "react";
import {Component} from "react";
import {withRouter, Link} from "react-router";
import {Layout, Steps, Row, Col} from "antd";
const {Content} = Layout;
const {Step} = Steps;
import {PathConfig} from "../../config/pathconfig";

interface NaProcessDemoPageProps {

}

interface NaProcessDemoPageStates {

}

const data = [
    {
        title: "免费注册获得仓库信息",
        cover: "http://www.famliytree.cn/icon/process-demo_1.jpg"
    }, {
        title: "将需要仓储、转运的物品发往您的“专属仓库地址”",
        cover: "http://www.famliytree.cn/icon/process-demo_2.jpg"
    }, {
        title: "物品打包后，提交打包申请",
        cover: "http://www.famliytree.cn/icon/process-demo_3.jpg"
    }, {
        title: "填写物品海关申报，并提交发运",
        cover: "http://www.famliytree.cn/icon/process-demo_4.jpg"
    }
];

@withRouter
export class NaProcessDemoPage extends Component<NaProcessDemoPageProps, NaProcessDemoPageStates> {
    constructor(props, context) {
        super(props, context)
    }

    renderStep() {
        return data.map(function (item, index) {
            const title = <h1>{item.title}</h1>;
            const des = <img style={{maxWidth: '100%', padding: '16px 48px 16px 0px'}} src={item.cover}/>;
            return <Step key={index} status="process" title={title} description={des}/>
        })
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
                                <h2>操作演练<span style={{paddingLeft: 16, fontSize: 16}}>OPERATIONAL EXERCISES</span></h2>
                            </Col>
                            <Col style={{display: 'flex', alignItems: 'center'}}>
                                <Link style={{paddingRight: 5}} to={PathConfig.HomePage}>首页</Link>
                                <Link to={PathConfig.ProcessDemoPage}>流程演示</Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={22} sm={22} md={18} lg={18} xl={18}>
                        <Steps direction="vertical">
                            {topThis.renderStep()}
                        </Steps>
                    </Col>
                </Row>
            </Content>
        </Layout>;
    }
}
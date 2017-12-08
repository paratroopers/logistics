import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Layout, Steps, Icon} from "antd";
import {NaContext} from '../../util/common';
const {Content} = Layout;
const {Step} = Steps;

interface NaProcessDemoPageProps {

}

interface NaProcessDemoPageProps {

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
export class NaProcessDemoPage extends Component<NaProcessDemoPageProps, NaProcessDemoPageProps> {
    constructor(props, context) {
        super(props, context)
    }

    renderStep() {
        return data.map(function (item, index) {
            const des = <img src={item.cover}/>;
            return <Step key={index} status="process" title={item.title} description={des}/>
        })
    }


    render() {
        const topThis = this;
        return <Layout style={{minHeight: '100%', backgroundColor: '#FFF'}}>
            <Content>
                <Steps direction="vertical">
                    {topThis.renderStep()}
                </Steps>
            </Content>
        </Layout>;
    }
}
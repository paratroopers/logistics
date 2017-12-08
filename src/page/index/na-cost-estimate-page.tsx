import * as React from "react";
import {Component} from "react";
import {withRouter, Link} from "react-router";
import {PathConfig} from "../../config/pathconfig";
import {Layout, Row, Col, Form, Input, Button, Tag} from "antd";
const {Content} = Layout;
const FormItem = Form.Item;
const {CheckableTag} = Tag;
const {TextArea} = Input;

interface NaCostEstimatePageProps {

}

interface NaCostEstimatePageStates {
    selectedTagsA: any;
    selectedTagsB: any;
}

@withRouter
export class NaCostEstimatePage extends Component<NaCostEstimatePageProps, NaCostEstimatePageStates> {
    constructor(props, context) {
        super(props, context)
        this.state = {
            selectedTagsA: [],
            selectedTagsB: []
        }
    }

    TagAChange(tag, checked) {
        const topThis = this;
        const {state: {selectedTagsA}} = topThis;
        const nextSelectedTags = checked ?
            [...selectedTagsA, tag] :
            selectedTagsA.filter(t => t !== tag);
        this.setState({selectedTagsA: nextSelectedTags});
    }

    TagBChange(tag, checked) {
        const topThis = this;
        const {state: {selectedTagsB}} = topThis;
        const nextSelectedTags = checked ?
            [...selectedTagsB, tag] :
            selectedTagsB.filter(t => t !== tag);
        this.setState({selectedTagsB: nextSelectedTags});
    }

    renderContent() {
        const topThis = this;
        const {state: {selectedTagsA, selectedTagsB}} = topThis;
        const tagsFromServerA = ['美食/零食', '美妆/洗护', '家具/家饰', '女装/男装', '鞋靴/箱包', '运动/乐器', '玩具/孕产', '家电/数码', '眼睛/手表'];
        const tagsFromServerB = ['国际一二线品牌', '少量液体、膏状、药品', '纯液体、内置电池', '木制品（原木）'];
        return <Row type="flex" justify="space-between">
            <Col span={10}>
                <Form layout="vertical">
                    <FormItem label="收货国家">
                        <Input size="large"/>
                    </FormItem>
                    <FormItem label="重量（kg）公斤">
                        <Input size="large"/>
                    </FormItem>
                    <FormItem label="体积（m3）">
                        <Input size="large"/>
                    </FormItem>
                    <FormItem>
                        <Row type="flex" justify="center">
                            <Button size="large" type="primary">开始计算</Button>
                        </Row>
                    </FormItem>
                </Form>
            </Col>
            <Col span={10}>
                <Row>
                    <h4>运输方式推荐</h4>
                </Row>
                <Row>
                    <h5>您的包裹里面有什么物品（请选择）</h5>
                </Row>
                <Row style={{margin: 5}}>
                    {tagsFromServerA.map(tag => (
                        <Tag key={tag}
                             style={{fontSize: 18, lineHeight: '40px', height: 40, padding: '0 20px', margin: 5}}
                             color="orange">{tag}</Tag>
                    ))}
                </Row>
                <Row>
                    <h5>其他敏感选择</h5>
                </Row>
                <Row style={{margin: 5}}>
                    {tagsFromServerB.map(tag => (
                        <Tag key={tag}
                             style={{fontSize: 18, lineHeight: '40px', height: 40, padding: '0 20px', margin: 5}}
                             color="orange">{tag}</Tag>
                    ))}
                </Row>
                <Row>
                    <h5>适合的运输渠道有</h5>
                </Row>
                <Row>
                    <TextArea rows={4}/>
                </Row>
                <Row style={{margin: '20px 0'}} type="flex" justify="center">
                    <Button size="large" type="primary">点击推荐</Button>
                </Row>
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
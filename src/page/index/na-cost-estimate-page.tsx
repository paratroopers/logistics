import * as React from "react";
import {Component} from "react";
import {withRouter, Link} from "react-router";
import {PathConfig} from "../../config/pathconfig";
import {Layout, Row, Col, Form, Input, Button, Tag, Table} from "antd";

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

    renderTable() {
        const columns = [{
            title: '运输方式',
            dataIndex: 'a',
        }, {
            title: '计费重量(kg)',
            dataIndex: 'b',
        }, {
            title: '运费(RMB)',
            dataIndex: 'c',
        }, {
            title: '送达时间(工作日)',
            dataIndex: 'd',
        }, {
            title: '服务费(RMB)',
            dataIndex: 'e',
        }, {
            title: '总费用(RMB)',
            dataIndex: 'f',
        }, {
            title: '备注',
            dataIndex: 'g',
        }, {
            title: '发运注意事项',
            dataIndex: 'h',
            render: (text, record, index) => {
                return <a href="#">点击查看</a>
            },
        }];

        const data = [{
            key: '1',
            a: '大包(SAL)',
            b: '11.000',
            c: '692.08',
            d: '15-至-30',
            e: '34.60',
            f: '726.68',
            g: '长宽高任意一边超60cm则计体积费用',
            h: 'h'
        }, {
            key: '2',
            a: '大包(SAL)',
            b: '11.000',
            c: '692.08',
            d: '15-至-30',
            e: '34.60',
            f: '726.68',
            g: '长宽高任意一边超60cm则计体积费用',
            h: 'h'
        }, {
            key: '3',
            a: '大包(SAL)',
            b: '11.000',
            c: '692.08',
            d: '15-至-30',
            e: '34.60',
            f: '726.68',
            g: '长宽高任意一边超60cm则计体积费用',
            h: 'h'
        }, {
            key: '4',
            a: '大包(SAL)',
            b: '11.000',
            c: '692.08',
            d: '15-至-30',
            e: '34.60',
            f: '726.68',
            g: '长宽高任意一边超60cm则计体积费用',
            h: 'h'
        }, {
            key: '5',
            a: '大包(SAL)',
            b: '11.000',
            c: '692.08',
            d: '15-至-30',
            e: '34.60',
            f: '726.68',
            g: '长宽高任意一边超60cm则计体积费用',
            h: 'h'
        }];
        return <Table
            columns={columns}
            dataSource={data}
            bordered
        />
    }

    renderContent() {
        const topThis = this;
        const {state: {selectedTagsA, selectedTagsB}} = topThis;
        const tagsFromServerA = ['美食/零食', '美妆/洗护', '家具/家饰', '女装/男装', '鞋靴/箱包', '运动/乐器', '玩具/孕产', '家电/数码', '眼睛/手表'];
        const tagsFromServerB = ['国际一二线品牌', '少量液体、膏状、药品', '纯液体、内置电池', '木制品（原木）'];
        return <Row type="flex" justify="space-between">
            <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                <Row>
                    <Form layout="vertical">
                        <FormItem>
                            <Input placeholder="收货国家" size="large"/>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="重量（kg）公斤" size="large"/>
                        </FormItem>
                        <Form.Item>
                            <Row type="flex" justify="center" align="top">
                                <Col span={7}><Input placeholder="长" size="large"/></Col>
                                <Col span={7} offset={1}><Input placeholder="宽" size="large"/></Col>
                                <Col span={8} offset={1}><Input placeholder="高" size="large"/></Col>
                                <Col span={1}></Col>
                            </Row>
                        </Form.Item>
                        <FormItem>
                            <Input placeholder="体积（m3）" size="large"/>
                        </FormItem>
                        <FormItem>
                            <Row type="flex" justify="center">
                                <Button size="large" type="primary">开始计算</Button>
                            </Row>
                        </FormItem>
                    </Form>
                </Row>
                <Row>
                    <Col style={{
                        border: '1px solid #e65922',
                        borderRadius: '10px',
                        padding: '10px 20px',
                        color: '#e65922'
                    }} span={24}>您可以通过支付宝、微信。以下费用已基本包含本公司所有的收费项目（磁检费、超重超长处理费、偏远地区派送费等除外）</Col>
                </Row>
            </Col>
            <Col xs={0} sm={0} md={24} lg={10} xl={10}>
                <Row>
                    <h4>运输方式推荐</h4>
                </Row>
                <Row>
                    <h5>您的包裹里面有什么物品（请选择）</h5>
                </Row>
                <Row style={{margin: 5}}>
                    {tagsFromServerA.map(tag => (
                        <Tag key={tag}
                             style={{fontSize: 14, lineHeight: '40px', height: 40, padding: '0 20px', margin: 5}}
                             color="orange">{tag}</Tag>
                    ))}
                </Row>
                <Row>
                    <h5>其他敏感选择</h5>
                </Row>
                <Row style={{margin: 5}}>
                    {tagsFromServerB.map(tag => (
                        <Tag key={tag}
                             style={{fontSize: 14, lineHeight: '40px', height: 40, padding: '0 20px', margin: 5}}
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
            <Col span={24}>
                {topThis.renderTable()}
            </Col>
        </Row>
    }

    render() {
        const topThis = this;
        return <Layout style={{minHeight: '100%', backgroundColor: '#FFF'}}>
            <Content>
                <Row style={{marginBottom: 24}} className="page-title-cost-image">
                </Row>
                <Row type="flex" justify="space-around">
                    <Col xs={22} sm={22} md={18} lg={18} xl={18}>
                        <Row type="flex" justify="space-between"
                             style={{borderBottom: '1px solid #c2c2c2', marginBottom: 24}}>
                            <Col>
                                <h2>费用估算<span style={{paddingLeft: 16, fontSize: 16}}>COST ESTIMATING</span></h2>
                            </Col>
                            <Col style={{display: 'flex', alignItems: 'center'}}>

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
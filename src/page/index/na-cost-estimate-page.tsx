import * as React from "react";
import {Component} from "react";
import {withRouter, Link} from "react-router";
import {PathConfig} from "../../config/pathconfig";
import {Layout, Row, Col, Form, Input, Button, Tag, Table} from "antd";
import HomeCostQuery from "../../components/controls/home-cost-query";
const {Content} = Layout;
const FormItem = Form.Item;
const {CheckableTag} = Tag;
const {TextArea} = Input;
import {NaUtil} from "../../util/util";
import {ScreenModeEnum} from "../../api/model/common-model";
import {Card, WingBlank, WhiteSpace, Modal} from 'antd-mobile';

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

interface NaCostEstimatePageProps {

}

interface NaCostEstimatePageStates {
    selectedTagsA: any;
    selectedTagsB: any;
}

@withRouter
export class NaCostEstimatePage extends Component<NaCostEstimatePageProps, NaCostEstimatePageStates> {
    isMobile: boolean;

    constructor(props, context) {
        super(props, context)
        this.state = {
            selectedTagsA: [],
            selectedTagsB: []
        }
        this.isMobile = (NaUtil.getScrrenMode(window.innerWidth) === ScreenModeEnum.sm);
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
        return <Table
            columns={columns}
            dataSource={data}
            bordered
        />;
    }

    renderCard() {
        const topThis = this;
        return <Row>
            {data.map(function (item, index) {
                return <Col key={index}>
                    <WingBlank size="sm">
                        <WhiteSpace size="sm"/>
                        <Card>
                            <Card.Header
                                title={item.a}
                                extra={<span
                                    style={{fontSize: '12px', color: '#e65922', cursor: 'pointer'}}>注意事项</span>}
                            />
                            <Card.Body>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>计费重量(kg)</h3>
                                    <p style={{fontSize: '12px'}}>{item.b}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>运费(RMB)</h3>
                                    <p style={{fontSize: '12px'}}>{item.c}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>送达时间(工作日)</h3>
                                    <p style={{fontSize: '12px'}}>{item.d}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>服务费(RMB)</h3>
                                    <p style={{fontSize: '12px'}}>{item.e}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>总费用(RMB) </h3>
                                    <p style={{fontSize: '12px'}}>{item.f}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>备注</h3>
                                    <p style={{fontSize: '12px'}}>{item.g}</p>
                                </Row>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="sm"/>
                    </WingBlank>
                </Col>;
            })}
        </Row>
    }

    renderContent() {
        const topThis = this;
        const {isMobile, state: {selectedTagsA, selectedTagsB}} = topThis;
        const tagsFromServerA = ['美食/零食', '美妆/洗护', '家具/家饰', '女装/男装', '鞋靴/箱包', '运动/乐器', '玩具/孕产', '家电/数码', '眼睛/手表'];
        const tagsFromServerB = ['国际一二线品牌', '少量液体、膏状、药品', '纯液体、内置电池', '木制品（原木）'];
        const fontSize = {fontSize: '14px'};
        return <Row type="flex" justify="space-between">
            <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                <HomeCostQuery></HomeCostQuery>
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
                    <span style={fontSize}>运输方式推荐</span>
                </Row>
                <Row>
                    <span style={fontSize}>您的包裹里面有什么物品（请选择）</span>
                </Row>
                <Row style={{margin: 5}}>
                    {tagsFromServerA.map(tag => (
                        <Tag key={tag}
                             style={{fontSize: 14, lineHeight: '40px', height: 40, padding: '0 20px', margin: 5}}
                             color="orange">{tag}</Tag>
                    ))}
                </Row>
                <Row>
                    <span style={fontSize}>其他敏感选择</span>
                </Row>
                <Row style={{margin: 5}}>
                    {tagsFromServerB.map(tag => (
                        <Tag key={tag}
                             style={{fontSize: 14, lineHeight: '40px', height: 40, padding: '0 20px', margin: 5}}
                             color="orange">{tag}</Tag>
                    ))}
                </Row>
                <Row>
                    <span style={fontSize}>适合的运输渠道有</span>
                </Row>
                <Row>
                    <TextArea rows={4}/>
                </Row>
                <Row style={{margin: '20px 0'}} type="flex" justify="center">
                    <Button size="large" type="primary">点击推荐</Button>
                </Row>
            </Col>
            <Col span={24}>
                {isMobile ? topThis.renderCard() : topThis.renderTable()}
            </Col>
        </Row>
    }

    render() {
        const topThis = this;
        return <Layout className="cost-estimate-page" style={{minHeight: '100%', backgroundColor: '#FFF'}}>
            <Content>
                <Row style={{marginBottom: 24, backgroundSize: 'cover'}} className="page-title-cost-image">
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
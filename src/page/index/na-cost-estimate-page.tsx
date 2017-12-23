import * as React from "react";
import {Component} from "react";
import {withRouter, Link} from "react-router";
import {PathConfig} from "../../config/pathconfig";
import {Layout, Row, Col, Form, Input, Button, Tag, Table} from "antd";
import CostQuery from "../../components/controls/na-cost";
const {Content} = Layout;
const FormItem = Form.Item;
const {CheckableTag} = Tag;
const {TextArea} = Input;
import {NaUtil} from "../../util/util";
import {ScreenModeEnum} from "../../api/model/common-model";
import {Card, WingBlank, WhiteSpace, Modal,List} from 'antd-mobile';

const data = [{
    key: '1',
    a: '大包(SAL)',
    b: '11.000',
    c: '692.08',
    d: '15-至-30',
    e: '34.60',
    f: '726.68',
    g: '长宽高任意一边超60cm则计体积费用',
    h: '发达国家和地区2-4个工作日，偏远地区、经济航班、dhl（小货）4-7个工作日体积重量计算公式=(长×宽×高)cm÷5000，实际重量与体积重量取大者为计费重量可一票多件（同一个运单号），总重量无上限（超一吨需预约仓位），单件重量上限300kg为了更顺利的进出口清关请去除包裹内关于商品的价格的标签，海关申报品名与数量必须精准受理延误正式书面查询：7个工作日后，查询期：7个工作日，理赔期：7个工作日包裹遗失最高赔偿标准为国际运费的3倍，时效延误可申请退还服务费禁止运输：化工品、不明物品、电池、液体粉末、食品、仿牌、活体动植物、货币、管制刀具...磁性检测费：2元/kg，最低30元起收（如音响、耳机、榨汁机...）超长附加费330元（单边长超1.2米的包裹），超重附加费330元（单件重量70kg以上），超长与超重同时满足的情况下收取一次330元，不重复收费国外退回的包裹客户需承担返回运费及税金（以账单为准），也可选择不付款（放弃或销毁该包裹）'
}, {
    key: '2',
    a: '大包(SAL)',
    b: '11.000',
    c: '692.08',
    d: '15-至-30',
    e: '34.60',
    f: '726.68',
    g: '长宽高任意一边超60cm则计体积费用',
    h: '注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项'
}, {
    key: '3',
    a: '大包(SAL)',
    b: '11.000',
    c: '692.08',
    d: '15-至-30',
    e: '34.60',
    f: '726.68',
    g: '长宽高任意一边超60cm则计体积费用',
    h: '注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项'
}, {
    key: '4',
    a: '大包(SAL)',
    b: '11.000',
    c: '692.08',
    d: '15-至-30',
    e: '34.60',
    f: '726.68',
    g: '长宽高任意一边超60cm则计体积费用',
    h: '注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项'
}, {
    key: '5',
    a: '大包(SAL)',
    b: '11.000',
    c: '692.08',
    d: '15-至-30',
    e: '34.60',
    f: '726.68',
    g: '长宽高任意一边超60cm则计体积费用',
    h: '注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项'
}];

interface NaCostEstimatePageProps {

}

interface NaCostEstimatePageStates {
    selectedTagsA: any;
    selectedTagsB: any;
    /** 手机版Modal*/
    mobileModalVisible:boolean;
    /** 注意事项*/
    mobileModalContent:string;
}

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

@withRouter
export class NaCostEstimatePage extends Component<NaCostEstimatePageProps, NaCostEstimatePageStates> {
    isMobile: boolean;

    constructor(props, context) {
        super(props, context)
        this.state = {
            selectedTagsA: [],
            selectedTagsB: [],
            mobileModalVisible:false,
            mobileModalContent:""
        }
        this.isMobile = (NaUtil.getScrrenMode(window.innerWidth) === ScreenModeEnum.sm);
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
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
            title: <span>运输方式<br/></span>,
            dataIndex: 'a'
        }, {
            title: <span>计费重量<br/>(kg)</span>,
            dataIndex: 'b'
        }, {
            title: <span>运费<br/>(RMB)</span>,
            dataIndex: 'c'
        }, {
            title: <span>送达时间<br/>(工作日)</span>,
            dataIndex: 'd'
        }, {
            title: <span>服务费<br/>(RMB)</span>,
            dataIndex: 'e'
        }, {
            title: <span>总费用<br/></span>,
            dataIndex: 'f'
        }, {
            title: <span>备注<br/></span>,
            dataIndex: 'g'
        }, {
            title: <span>注意事项<br/></span>,
            dataIndex: 'h',
            render: (text, record, index) => {
                return <a href="#">点击查看</a>
            }
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
                                extra={<a
                                    onClick={()=>{
                                        topThis.openMobileModal(item.h);
                                    }}
                                    style={{fontSize: '12px', color: '#e65922', cursor: 'pointer'}}>注意事项</a>}
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
                <CostQuery></CostQuery>
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

    openMobileModal(content:string){
        const topThis=this;
        topThis.setState({mobileModalVisible:true,mobileModalContent:content});
    }

    renderMobileModal(){
        const topThis=this;
        const {state:{mobileModalVisible,mobileModalContent}}=topThis;
        return <WingBlank>
            <WhiteSpace />
            <Modal
                visible={mobileModalVisible}
                transparent
                maskClosable={false}
                title="注意事项"
                footer={[{ text: 'Ok', onPress: ()=>{
                    topThis.setState({mobileModalVisible:false});
                }}]}
                onClose={()=>{
                    topThis.setState({mobileModalVisible:false});
                }}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
                <div style={{ height: 250, overflow: 'scroll' }}>
                    <p>{mobileModalContent}</p>
                </div>
            </Modal>
        </WingBlank>;
    }

    render() {
        const topThis = this;
        return <Layout className="cost-estimate-page" style={{minHeight: '100%', backgroundColor: '#FFF'}}>
            <Content>
                {topThis.renderMobileModal()}
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
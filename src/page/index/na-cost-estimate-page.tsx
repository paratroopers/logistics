import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {InjectedIntlProps} from "react-intl";
import {Layout, Row, Col, Input, Button, Tag, Table, Modal as WebModal} from "antd";
import CostQuery from "../../components/controls/na-cost";
import {CostTableModal} from '../../api/model/quotation';

const {Content} = Layout;
const {TextArea} = Input;
import {NaUtil} from "../../util/util";
import {ScreenModeEnum} from "../../api/model/common-model";
import {Card, WingBlank, WhiteSpace, Modal} from 'antd-mobile';

interface NaCostEstimatePageProps extends ReactRouter.RouteComponentProps<any, any>, InjectedIntlProps {

}

interface NaCostEstimatePageStates {
    selectedTagsA: any;
    selectedTagsB: any;
    /** 手机版Modal*/
    mobileModalVisible: boolean;
    /** 注意事项*/
    mobileModalContent: string;
    /** 首页带过来的费用估算信息*/
    costInfo?: any;
    /** 列表字段model*/
    data?: CostTableModal[];
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
        const query = props.location.query;
        this.state = {
            selectedTagsA: [],
            selectedTagsB: [],
            mobileModalVisible: false,
            mobileModalContent: "",
            costInfo: {
                ...query
            },
            data: []
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

    onTableRowClick(txt) {
        WebModal.info({
            width: 600,
            title: '注意事项',
            content: (
                <div style={{whiteSpace: 'pre-line'}}>
                    {txt}
                </div>
            ),
            onOk() {
            },
        });
    }

    renderTable() {
        const columns = [{
            title: <span>运输方式</span>,
            dataIndex: 'channelName',
            width: '8%'
        }, {
            title: <span>计费重量(kg)</span>,
            dataIndex: 'weight',
            width: '8%'
        }, {
            title: <span>运费(RMB)</span>,
            dataIndex: 'Amount',
            width: '8%'
        }, {
            title: <span>送达时间(工作日)</span>,
            dataIndex: 'Prescription',
            width: '10%'
        }, {
            title: <span>服务费(RMB)</span>,
            dataIndex: 'ServiceAmount',
            width: '5%'
        }, {
            title: <span>总费用</span>,
            dataIndex: 'AllCount',
            width: '5%',
            render: (txt, record) => {
                return <span>{record.ServiceAmount + record.Amount}</span>;
            }
        }, {
            title: <span>备注</span>,
            dataIndex: 'Remark',
            width: '10%'
        }, {
            title: <span>注意事项</span>,
            dataIndex: '',
            width: '5%',
            render: (text, record, index) => {
                return <a onClick={v => {
                    this.onTableRowClick(record.Clause);
                }}>点击查看</a>
            }
        }];
        return <Table columns={columns}
                      style={{minHeight: '400px'}}
                      bordered={false}
                      dataSource={this.state.data}
        />;
    }

    renderCard() {
        const topThis = this;
        return <Row>
            {this.state.data.map(function (item, index) {
                return <Col key={index}>
                    <WingBlank size="sm">
                        <WhiteSpace size="sm"/>
                        <Card>
                            <Card.Header
                                title={''}
                                extra={<a
                                    onClick={() => {
                                        topThis.openMobileModal(item.Clause);
                                    }}
                                    style={{fontSize: '12px', color: '#e65922', cursor: 'pointer'}}>注意事项</a>}
                            />
                            <Card.Body>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>计费重量(kg)</h3>
                                    <p style={{fontSize: '12px'}}>{item.weight}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>运费(RMB)</h3>
                                    <p style={{fontSize: '12px'}}>{item.Amount}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>送达时间(工作日)</h3>
                                    <p style={{fontSize: '12px'}}>{item.Prescription}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>服务费(RMB)</h3>
                                    <p style={{fontSize: '12px'}}>{item.ServiceAmount}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>总费用(RMB) </h3>
                                    <p style={{fontSize: '12px'}}>{item.Amount + item.ServiceAmount}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>备注</h3>
                                    <p style={{fontSize: '12px'}}>{item.Remark}</p>
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
        const {isMobile} = topThis;
        const tagsFromServerA = ['美食/零食', '美妆/洗护', '家具/家饰', '女装/男装', '鞋靴/箱包', '运动/乐器', '玩具/孕产', '家电/数码', '眼睛/手表'];
        const tagsFromServerB = ['国际一二线品牌', '少量液体、膏状、药品', '纯液体、内置电池', '木制品（原木）'];
        const fontSize = {fontSize: '14px'};
        return <Row type="flex" justify="space-between">
            <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                <CostQuery onClick={v => {
                    this.setState({data: v});
                }}></CostQuery>
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

    openMobileModal(content: string) {
        const topThis = this;
        topThis.setState({mobileModalVisible: true, mobileModalContent: content});
    }

    renderMobileModal() {
        const topThis = this;
        const {state: {mobileModalVisible, mobileModalContent}} = topThis;
        return <WingBlank>
            <WhiteSpace/>
            <Modal
                visible={mobileModalVisible}
                transparent
                maskClosable={false}
                title="注意事项"
                footer={[{
                    text: 'Ok', onPress: () => {
                        topThis.setState({mobileModalVisible: false});
                    }
                }]}
                onClose={() => {
                    topThis.setState({mobileModalVisible: false});
                }}
                wrapProps={{onTouchStart: this.onWrapTouchStart}}
            >
                <div style={{height: 250, overflow: 'scroll', whiteSpace: 'pre-line'}}>
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
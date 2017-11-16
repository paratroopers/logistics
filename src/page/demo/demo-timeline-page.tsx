import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Timeline, Icon, Pagination, Collapse, Radio, Row, Col, Switch, Card} from 'antd';
const TimelineItem = Timeline.Item;
const Panel = Collapse.Panel;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

interface DemoTimeLinePageProps {
}
interface DemoTimeLinePageStates {
    /* 当前页*/
    current: number;
    /* 默认的每页条数*/
    defaultPageSize: number;
    /* 分页总数*/
    paginationTotal: number;
    /* 选择展示的Item类型*/
    radioType: string;
    /* 文章列表*/
    dataList: any;
    /* 是否展开列表*/
    switchChecked: boolean;
}

@withRouter
export class DemoTimeLinePage extends Component<DemoTimeLinePageProps, DemoTimeLinePageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current: 1,
            defaultPageSize: 10,
            paginationTotal: 0,
            radioType: "",
            dataList: [],
            switchChecked: true
        }
    }

    /* 加载数据*/
    componentDidMount() {
        const topThis = this;
        const newlist = require("../../config/data/newlist.json");
        topThis.setState({dataList: newlist.data, paginationTotal: newlist.total});
    }

    /* 改变每页显示条目数——当前页数*每页条数*/
    onShowSizeChangePagination(current, pageSize) {
        const topThis = this;
        topThis.setState({defaultPageSize: pageSize, current: current});
    }

    /*页码改变的回调 页码*每页条数*/
    onChangePagination(current, pageSize) {
        const topThis = this;
        topThis.setState({defaultPageSize: pageSize, current: current});
    }

    /* 时间轴分页*/
    renderPagination() {
        const topThis = this;
        const {state: {paginationTotal}} = topThis;
        return <Pagination
            size="small"
            total={paginationTotal}
            showSizeChanger
            showQuickJumper
            onShowSizeChange={topThis.onShowSizeChangePagination.bind(this)}
            onChange={topThis.onChangePagination.bind(this)}/>
    }

    /* 折叠面板*/
    callbackCollapse(key) {
        console.log(key);
    }

    /* 单选按钮*/
    onChangeRadioGroup(e) {
        const topThis = this;
        topThis.setState({radioType: e.target.value});
    }

    /* 是否展开列表*/
    onChangeSwitch(checked: boolean) {
        const topThis = this;
        topThis.setState({switchChecked: checked});
    }

    renderItem(item, index) {
        const topThis = this;
        const {state: {radioType, switchChecked}} = topThis;
        const customCollapseStyle = {
            border: 0,
        };
        const customPanelStyle = {
            background: '#919191',
            borderRadius: 10,
            marginBottom: 24,
            border: 0,
        };
        const defaultActive = switchChecked ? ['0'] : ['-1'];
        const panelKey = switchChecked ? '0' : index.toString();
        let result = null;
        switch (radioType) {
            case "1":/* 默认*/
                const header = <Row>
                    <Col span={12} style={{textAlign: "left"}}>{item.title}</Col>
                    <Col span={12} style={{textAlign: "right", paddingRight: 24}}>
                        <a href="">More</a>
                    </Col>
                </Row>;
                result = <TimelineItem color="#404040" dot={<Icon type="clock-circle-o" style={{fontSize: '16px'}}/>}
                                       key={index}>
                    <Collapse onChange={topThis.callbackCollapse.bind(this)} key={index}
                              defaultActiveKey={defaultActive}>
                        <Panel header={header} key={panelKey}>
                            <p>{item.abstract}</p>
                        </Panel>
                    </Collapse>
                </TimelineItem>;
                break;
            case "2":/* 一套没有边框的简洁样式*/
                result = <TimelineItem color="#404040" dot={<Icon type="clock-circle-o" style={{fontSize: '16px'}}/>}
                                       key={index}>
                    <Collapse bordered={false} onChange={topThis.callbackCollapse.bind(this)} key={index}
                              defaultActiveKey={defaultActive}>
                        <Panel header={item.title} key={panelKey}>
                            <p>{item.abstract}</p>
                        </Panel>
                    </Collapse>
                </TimelineItem>;
                break;
            case "3":/* 自定义各个面板的背景色、圆角和边距.*/
                result = <TimelineItem color="#404040" dot={<Icon type="clock-circle-o" style={{fontSize: '16px'}}/>}
                                       key={index}>
                    <Collapse onChange={topThis.callbackCollapse.bind(this)} style={customCollapseStyle} key={index}
                              defaultActiveKey={defaultActive}>
                        <Panel header={item.title} key={panelKey} style={customPanelStyle}>
                            <p>{item.abstract}</p>
                        </Panel>
                    </Collapse>
                </TimelineItem>;
                break;
            case "4":/* 经典卡片*/
                result = <TimelineItem color="#404040"
                                       dot={<Icon type="clock-circle-o" style={{fontSize: '16px'}}/>}
                                       key={index}>
                    <Card title={item.title} extra={<a href="">More</a>}>
                        <p>{item.abstract}</p>
                    </Card>
                </TimelineItem>;
                break;
            case "5":
                result = <TimelineItem color="#404040"
                                       dot={<Icon type="clock-circle-o" style={{fontSize: '16px'}}/>}
                                       key={index}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card bordered={true}>
                                <Row className="custom-image">
                                    <img alt="example" width="100%" src={item.cover} style={{cursor: "pointer"}}/>
                                </Row>
                                <Row className="custom-card">
                                    <h2>{item.title}</h2>
                                    <h4 style={{padding: "5px 0px"}}>{"作者：" + item.author}</h4>
                                    <p>{item.abstract.substring(0, 55) + "..."}</p>
                                    <p style={{paddingTop: "5px", color: "#5a5a5a"}}>344.3 k次播放&nbsp;&nbsp;|&nbsp;&nbsp;
                                        评论:208&nbsp;&nbsp;|&nbsp;&nbsp;喜欢:1.2 k</p>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card bordered={true}>
                                <Row className="custom-image">
                                    <img alt="example" width="100%" src={item.cover} style={{cursor: "pointer"}}/>
                                </Row>
                                <Row className="custom-card">
                                    <h2>{item.title}</h2>
                                    <h4 style={{padding: "5px 0px"}}>{"作者：" + item.author}</h4>
                                    <p>{item.abstract.substring(0, 55) + "..."}</p>
                                    <p style={{paddingTop: "5px", color: "#5a5a5a"}}>344.3 k次播放&nbsp;&nbsp;|&nbsp;&nbsp;
                                        评论:208&nbsp;&nbsp;|&nbsp;&nbsp;喜欢:1.2 k</p>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card bordered={true}>
                                <Row className="custom-image">
                                    <img alt="example" width="100%" src={item.cover} style={{cursor: "pointer"}}/>
                                </Row>
                                <Row className="custom-card">
                                    <h2>{item.title}</h2>
                                    <h4 style={{padding: "5px 0px"}}>{"作者：" + item.author}</h4>
                                    <p>{item.abstract.substring(0, 55) + "..."}</p>
                                    <p style={{paddingTop: "5px", color: "#5a5a5a"}}>344.3 k次播放&nbsp;&nbsp;|&nbsp;&nbsp;
                                        评论:208&nbsp;&nbsp;|&nbsp;&nbsp;喜欢:1.2 k</p>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card bordered={true}>
                                <Row className="custom-image">
                                    <img alt="example" width="100%" src={item.cover} style={{cursor: "pointer"}}/>
                                </Row>
                                <Row className="custom-card">
                                    <h2>{item.title}</h2>
                                    <h4 style={{padding: "5px 0px"}}>{"作者：" + item.author}</h4>
                                    <p>{item.abstract.substring(0, 55) + "..."}</p>
                                    <p style={{paddingTop: "5px", color: "#5a5a5a"}}>344.3 k次播放&nbsp;&nbsp;|&nbsp;&nbsp;
                                        评论:208&nbsp;&nbsp;|&nbsp;&nbsp;喜欢:1.2 k</p>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </TimelineItem>;
                break;
            default:
                result = <TimelineItem color="#404040" dot={<Icon type="clock-circle-o" style={{fontSize: '16px'}}/>}
                                       key={index}>
                    <Collapse onChange={topThis.callbackCollapse.bind(this)} key={index}
                              defaultActiveKey={defaultActive}>
                        <Panel header={item.title} key={panelKey}>
                            <p>{item.abstract}</p>
                        </Panel>
                    </Collapse>
                </TimelineItem>;
                break;
        }
        return result;
    }

    renderTimeline() {
        const topThis = this;
        const {state: {dataList}} = topThis;
        return <Timeline pending={topThis.renderPagination()} style={{paddingTop: 24}}>
            {dataList.map(function (item, index) {
                return topThis.renderItem(item, index);
            })}
        </Timeline>;
    }

    render() {
        const topThis = this;
        const {state: {switchChecked}} = topThis;
        return <div>
            <Row>
                <Switch checked={switchChecked} onChange={topThis.onChangeSwitch.bind(this)} checkedChildren={'样式展开'}
                        unCheckedChildren={'样式闭合'}/>
            </Row>
            <RadioGroup onChange={topThis.onChangeRadioGroup.bind(this)} style={{paddingTop: 24}}>
                <RadioButton value="1">模板一</RadioButton>
                <RadioButton value="2">模板二</RadioButton>
                <RadioButton value="3">模板三</RadioButton>
                <RadioButton value="4">模板四</RadioButton>
                <RadioButton value="5">模板五</RadioButton>
            </RadioGroup>
            {topThis.renderTimeline()}
        </div>;
    }
}

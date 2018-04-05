import * as React from 'react';
import {Link, hashHistory}from "react-router";
import {List, Spin, Tag, Row, Col} from 'antd';
import {Global} from '../util/common';
import {MessageLocale} from '../locales/localeid';
import {FormStepIcon, FormStepEnum} from './form-step-icon';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import {RequestNameSpace} from '../model/request';
import {ResponseNameSpace} from '../model/response';
import * as  moment from 'moment';
import {PathConfig} from "../config/pathconfig";

moment.locale('zh-cn');

interface FormMessageListProps {
    /** 自动出现省略号*/
    layoutText?: boolean;
    /** 状态是否显示为tag模式*/
    tagStatus?: boolean;
    /** 是否全屏展示*/
    fullScreen?: boolean;
    /** 消息类型*/
    messageType?: ModelNameSpace.MessageType;
    /** 是否为分页*/
    isPagination?: boolean;
    /** 点击回调*/
    onClick?: () => void;
}

interface FormMessageListStates {
    loading: boolean,
    messageItems: ModelNameSpace.MessageModel[];
    textStyle?: any;
    /** 当前页数*/
    pageIndex: number;
    /** 每页条数*/
    pageSize: number;
    /** 总数*/
    totalCount: number;
}

export class FormMessageList extends React.Component<FormMessageListProps, FormMessageListStates> {
    defaultStyle = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }

    static defaultColor = {
        WaitForPay: 'wait-for-pay',
        Delivered: 'delivered',
        WaitForPack: 'wait-for-pack'
    }

    constructor(props, content) {
        super(props, content);
        this.state = {
            loading: false,
            messageItems: [],
            textStyle: props.layoutText ? this.defaultStyle : {},
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
        }
    }

    componentDidMount() {
        const topThis = this;
        const {state: {pageIndex, pageSize}} = topThis;
        this.getMessageData(pageIndex, pageSize);
    }

    onClick(type, item) {
        const topThis = this;
        const {props: {onClick}} = topThis;
        switch (type) {
            case "item":
                hashHistory.push(topThis.getPath(item));
                break;
            case "system":
                hashHistory.push({pathname: PathConfig.MessageManagerViewPage, state: item});
                break;
        }
        if (onClick)
            onClick();
    }

    getPath(item: ModelNameSpace.MessageModel) {
        switch (item.type) {
            case  FormStepEnum.Delivered:
                return {pathname: PathConfig.WarehouseOutViewPage, query: {id: item.orderID}};
            case  FormStepEnum.WaitForPay:
                return {pathname: PathConfig.MemberWaitPayViewPage, query: {id: item.orderID}};
            case  FormStepEnum.WaitForPack:
                return {pathname: PathConfig.WarehouseInViewPage, state: {ID: item.orderID}};
        }
        return {pathname: ""};
    }

    getMessageData(index?: number, size?: number) {
        const topThis = this;
        const {props: {messageType, isPagination}} = topThis;
        this.setState({loading: true});
        const request: RequestNameSpace.GetMessageLatestListRequest = {
            messageType: messageType ? messageType : ModelNameSpace.MessageType.All,
            pageIndex: index,
            pageSize: size,
            isAdmin: false
        }

        if (isPagination === true) {
            APINameSpace.MemberAPI.GetMessageList(request).then((result: ResponseNameSpace.GetMessageListResponse) => {
                if (result.Status === 0) {
                    topThis.setState({
                        messageItems: result.Data === null ? [] : result.Data,
                        loading: false,
                        pageIndex: index,
                        totalCount: result.TotalCount
                    });
                }
            });
        } else {
            APINameSpace.MemberAPI.GetMessageLatestList(request).then((result: ResponseNameSpace.GetMessageLatestListResponse) => {
                if (result.Status === 0) {
                    topThis.setState({
                        messageItems: result.Data === null ? [] : result.Data,
                        loading: false
                    });
                }
            });
        }
    }

    renderMessageStatus(type: FormStepEnum): { message: string, textClass: string, tagColor: string } {
        const {WaitForPack, WaitForPay, Delivered, Manager} = MessageLocale;
        let formatMessage: string;
        let textColor: string;
        let tagColor: string;
        switch (type) {
            case FormStepEnum.WaitForPack:
                formatMessage = WaitForPack;
                textColor = FormMessageList.defaultColor.WaitForPack;
                tagColor = "green";
                break;
            case FormStepEnum.WaitForPay:
                formatMessage = WaitForPay;
                textColor = FormMessageList.defaultColor.WaitForPay;
                tagColor = "red";
                break;
            case FormStepEnum.Delivered:
                formatMessage = Delivered;
                textColor = FormMessageList.defaultColor.Delivered;
                tagColor = "purple";
                break;
            default:
                formatMessage = Manager;
                textColor = "";
                tagColor = "";
                break;
        }

        return {message: Global.intl.formatMessage({id: formatMessage}), textClass: textColor, tagColor: tagColor};
    }

    renderItem(item: ModelNameSpace.MessageModel) {
        const topThis = this;
        const {props: {tagStatus}, state: {textStyle}} = topThis;

        const message = this.renderMessageStatus(item.type);

        const title = <Row style={textStyle} type="flex" align="middle" justify="space-between">
            {Global.intl.formatMessage({id: MessageLocale.YourOrder})}
            <a style={{margin: '0 5px'}}>{item.message}</a>
        </Row>

        const des = <Row type="flex" align="middle" justify="space-between">
            <Col>{moment(item.Created).fromNow()}</Col>
            <Col>{tagStatus ?
                <Tag color={message.tagColor}>{message.message}</Tag> : message.message}</Col>
        </Row>

        return <div onClick={topThis.onClick.bind(this, "item", item)}>
            <List.Item className="form-message-list-item">
                <List.Item.Meta
                    className="form-message-list-item-meta"
                    avatar={<FormStepIcon size={40} type={item.type as FormStepEnum}></FormStepIcon>}
                    title={title}
                    description={des}/>
            </List.Item>
        </div>;
    }

    renderSystemItem(item: ModelNameSpace.MessageModel) {
        const topThis = this;

        const description = <Row className="desc-content">
            <Col
                className="desc-desc">{item.message.replace(/<(?:.|\s)*?>/g, "").replace(/<\/?.+?>/g, "").replace(/ /g, "")}</Col>
            <Row type="flex" justify="space-between" align="middle">
                <Col>{moment(item.Created).fromNow()}</Col>
                <Col><Tag color="orange">系统消息</Tag></Col>
            </Row>
        </Row>

        return <div onClick={topThis.onClick.bind(this, "system", item)}>
            <List.Item
                className="form-message-list-item">
                <List.Item.Meta
                    className="form-message-list-item-meta"
                    title={item.title}
                    description={description}/>
            </List.Item>
        </div>;
    }

    render() {
        const topThis = this;
        const {props: {messageType, isPagination}, state: {loading, messageItems, pageIndex, pageSize, totalCount}} = topThis;

        /** 分页*/
        const pagination = {
            pageSize: pageSize,
            current: pageIndex,
            total: totalCount,
            onChange: ((index) => {
                topThis.getMessageData(index, pageSize);
            }),
        };

        return <Spin spinning={loading}>
            <div className="form-message-list">
                <List dataSource={messageItems}
                      pagination={isPagination && messageItems && messageItems.length > 0 ? pagination : false}
                      renderItem={item => messageType !== ModelNameSpace.MessageType.System ? topThis.renderItem(item) : topThis.renderSystemItem(item)}>
                </List>
            </div>
        </Spin>;
    }
}
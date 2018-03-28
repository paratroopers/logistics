import * as React from 'react';
import {Link}from "react-router";
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
    isPagination?:boolean;
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
        WarehouseIn: 'warehouse-in',
        CustomerServiceConfirm: 'customer-service-confirm',
        WarehousePackge: 'warehouse-packge',
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
            APINameSpace.MemberAPI.GetMessageList(request).then((result:ResponseNameSpace.GetMessageListResponse) => {
                if (result.Status === 0) {
                    topThis.setState({
                        messageItems: result.Data,
                        loading: false,
                        pageIndex: index,
                        totalCount: result.TotalCount
                    });
                }
            });
        } else {
            APINameSpace.MemberAPI.GetMessageLatestList(request).then((result:ResponseNameSpace.GetMessageLatestListResponse) => {
                if (result.Status === 0) {
                    topThis.setState({
                        messageItems: result.Data,
                        loading: false
                    });
                }
            });
        }
    }

    renderMessageStatus(type: FormStepEnum): { message: string, textClass: string, tagColor: string } {
        const {WarehouseIn, CustomerServiceConfirm, WarehousePackge, WaitForPay, Delivered,Manager} = MessageLocale;
        let formatMessage: string;
        let textColor: string;
        let tagColor: string;
        switch (type) {
            case FormStepEnum.WarehouseIn:
                formatMessage = WarehouseIn;
                textColor = FormMessageList.defaultColor.WarehouseIn;
                tagColor = "blue";
                break;
            case FormStepEnum.CustomerServiceConfirm:
                formatMessage = CustomerServiceConfirm;
                textColor = FormMessageList.defaultColor.CustomerServiceConfirm;
                tagColor = "gold";
                break;
            case FormStepEnum.WarehousePackge:
                formatMessage = WarehousePackge;
                textColor = FormMessageList.defaultColor.WarehousePackge;
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

        return <List.Item className="message-list-item">
            <List.Item.Meta
                className="message-list-item-meta"
                avatar={<FormStepIcon size={40} type={item.type as FormStepEnum}></FormStepIcon>}
                title={title}
                description={des}/>
        </List.Item>;
    }

    renderSystemItem(item: ModelNameSpace.MessageModel) {
        const title =
            <Row type="flex" align="middle" justify="space-between">
                <Col>{item.title}</Col>
                <Col>{moment(item.Created).fromNow()}</Col>
            </Row>

        return <Link to={{pathname: PathConfig.MessageManagerViewPage, state: item}}><List.Item
            className="message-list-item">
            <List.Item.Meta
                className="message-list-item-meta"
                title={title}
                description={item.message.replace(/<(?:.|\s)*?>/g, "").replace(/<\/?.+?>/g, "").replace(/ /g, "")}/>
        </List.Item>
        </Link>;
    }

    render() {
        const topThis = this;
        const {props: {messageType, isPagination}, state: {loading, messageItems, pageIndex, pageSize,totalCount}} = topThis;

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
            <div className="message-list">
                <List dataSource={messageItems}
                      pagination={isPagination ? pagination : false}
                      renderItem={item => !(messageType === ModelNameSpace.MessageType.System) ? topThis.renderItem(item) : topThis.renderSystemItem(item)}>
                </List>
            </div>
        </Spin>;
    }
}
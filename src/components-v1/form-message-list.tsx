import * as React from 'react';
import {List, Spin, Tag, Row, Col} from 'antd';
import {Global} from '../util/common';
import {MessageLocale} from '../locales/localeid';
import {FormStepIcon, FormStepEnum} from './form-step-icon';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import * as  moment from 'moment';

moment.locale('zh-cn');

interface FormMessageListProps {
    /** 自动出现省略号*/
    layoutText?: boolean;
    /** 状态是否显示为tag模式*/
    tagStatus?: boolean;
    /** 是否全屏展示*/
    fullScreen?: boolean;
    /** 是否显示为系统消息*/
    isSystem?: boolean;
}

interface FormMessageListStates {
    loading: boolean,
    messageItems?: ModelNameSpace.MessageLaterModel[];
    textStyle?: any;
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
            textStyle: props.layoutText ? this.defaultStyle : {}
        }
    }

    componentDidMount() {
        this.getMessageData();
    }

    getMessageData() {
        const topThis = this;
        const {props: {isSystem}} = topThis;
        this.setState({loading: true});
        APINameSpace.MemberAPI.GetMesaageLatest().then(result => {
            if (result.Status === 0) {
                if (isSystem) result.Data = [{message: "程序员反感（讨厌、不喜欢）什么？别人我不知道。我最反感！！！下班了，明明没啥事。都不走！都不走！都不走！然后，我忍不住了。一打卡！！不到10分钟。全跑完了！全跑完了！全跑完了！"}, {message: "程序员反感（讨厌、不喜欢）什么？别人我不知道。我最反感！！！下班了，明明没啥事。都不走！都不走！都不走！然后，我忍不住了。一打卡！！不到10分钟。全跑完了！全跑完了！全跑完了！"}, {message: "程序员反感（讨厌、不喜欢）什么？别人我不知道。我最反感！！！下班了，明明没啥事。都不走！都不走！都不走！然后，我忍不住了。一打卡！！不到10分钟。全跑完了！全跑完了！全跑完了！"}];
                this.setState({messageItems: result.Data, loading: false});
            }
        });
    }

    renderMessageStatus(type: FormStepEnum): { message: string, textClass: string, tagColor: string } {
        const {WarehouseIn, CustomerServiceConfirm, WarehousePackge, WaitForPay, Delivered} = MessageLocale;
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
        }
        return {message: Global.intl.formatMessage({id: formatMessage}), textClass: textColor, tagColor: tagColor};
    }

    renderItem(item: ModelNameSpace.MessageLaterModel) {
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

    renderSystemItem(item: ModelNameSpace.MessageLaterModel) {
        const title = <Row type="flex" align="middle" justify="space-between">
            <Col>系统通知</Col>
            <Col>{moment(item.Created).fromNow()}</Col>
        </Row>

        return <List.Item className="message-list-item">
            <List.Item.Meta
                className="message-list-item-meta"
                title={title}
                description={item.message}/>
        </List.Item>;
    }

    render() {
        const topThis = this;
        const {props: {isSystem}} = topThis;
        return <Spin spinning={this.state.loading}>
            <div className="message-list">
                <List dataSource={this.state.messageItems}
                      renderItem={item => !isSystem ? topThis.renderItem(item) : topThis.renderSystemItem(item)}>
                </List>
            </div>
        </Spin>;
    }
}
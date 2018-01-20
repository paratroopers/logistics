import * as React from 'react';
import {BaseAPI} from '../../api/base';
import {List, Spin, Tag} from 'antd';
import {Global} from '../../util/common';
import {MessageLocale} from '../../locales/localeid';
import {MessageLaterModel} from '../../api/model/base';
import {FormStepIcon, FormStepEnum} from '../form/form-step-icon';
import * as  moment from 'moment'

moment.locale('zh-cn');

interface FormMessageListProps {
    /*自动出现省略号*/
    layoutText?: boolean;
    /* 状态是否显示为tag模式*/
    tagStatus?: boolean;
}

interface FormMessageListStates {
    loading: boolean,
    messageItems?: MessageLaterModel[];
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
        WaitForPack:'wait-for-pack'
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
        this.setState({loading: true});
        BaseAPI.GetMesaageLatest().then(result => {
            if (result.Status === 0) {
                this.setState({messageItems: result.Data, loading: false});
            }
        });
    }

    renderMessageStatus(item): { message: string, textClass: string } {
        const {WarehouseIn, CustomerServiceConfirm, WarehousePackge, WaitForPay, Delivered} = MessageLocale;
        let formatMessage: string;
        let textColor: string;
        switch (item.type) {
            case FormStepEnum.WarehouseIn:
                formatMessage = WarehouseIn;
                textColor = FormMessageList.defaultColor.WarehouseIn;
                break;
            case FormStepEnum.CustomerServiceConfirm:
                formatMessage = CustomerServiceConfirm;
                textColor = FormMessageList.defaultColor.CustomerServiceConfirm;
                break;
            case FormStepEnum.WarehousePackge:
                formatMessage = WarehousePackge;
                textColor = FormMessageList.defaultColor.WarehousePackge;
                break;
            case FormStepEnum.WaitForPay:
                formatMessage = WaitForPay;
                textColor = FormMessageList.defaultColor.WaitForPay;
                break;
            case FormStepEnum.Delivered:
                formatMessage = Delivered;
                textColor = FormMessageList.defaultColor.Delivered;
                break;
        }
        return {message: Global.intl.formatMessage({id: formatMessage}), textClass: textColor};
    }

    renderMessage(item) {
        const message = this.renderMessageStatus(item)
        return <div style={this.state.textStyle}>
            {Global.intl.formatMessage({id: MessageLocale.YourOrder})}
            <a style={{margin: '0 5px'}}>{item.message}</a>
            {
                this.props.tagStatus ?
                    <Tag className={"status-tag " + message.textClass}>{message.message}</Tag>
                    : message.message
            }
        </div>;
    }

    renderItem(item: MessageLaterModel) {
        return <List.Item>
            <List.Item.Meta
                avatar={<FormStepIcon size={40}
                                      type={item.type as FormStepEnum}></FormStepIcon>}
                title={this.renderMessage(item)}
                description={moment(item.Created).fromNow()}/>
        </List.Item>;
    }

    render() {
        return <Spin spinning={this.state.loading}>
            <div className="message-list">
                <List dataSource={this.state.messageItems}
                      renderItem={item => this.renderItem(item)}>
                </List>
            </div>
        </Spin>;
    }
}
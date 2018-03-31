import * as React from 'react';
import {withRouter, hashHistory} from 'react-router';
import {Row, message,Spin} from 'antd';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import FormMessageManager,{FormMessageManagerType} from "../components-v1/form-message-manager";
import {RequestNameSpace} from '../model/request';
import {APINameSpace} from '../model/api';
import {ResponseNameSpace} from '../model/response';
import {ModelNameSpace} from "../model/model";
import {PathConfig} from "../config/pathconfig";

interface MessageManagerAddPageProps {
}

interface MessageManagerAddPageStates {
    loading:boolean;
}

@withRouter
export class MessageManagerAddPage extends React.Component<MessageManagerAddPageProps, MessageManagerAddPageStates> {
    constructor(props) {
        super(props);
        this.state={
            loading:false
        }
    }

    onSubmit = (values,status) => {
        const topThis=this;
        const request: RequestNameSpace.AddMessageManagerItemRequest = {
            status: status,
            type: ModelNameSpace.MessageType.System,
            title: values.title,
            message: values.message,
            isAdmin: true,
        }
        topThis.setState({loading:true});
        APINameSpace.MemberAPI.AddMessageManagerItem(request).then((result: ResponseNameSpace.BaseResponse) => {
            topThis.setState({loading:false},()=>{
                if (result.Status === 0) {
                    message.success("新增成功!");
                    hashHistory.push(PathConfig.MessageManagerPage);
                }
            })
        })

    }

    render() {
        const topThis = this;
        const {state:{loading}}=topThis;
        return <Spin size="large" spinning={loading}><Row className="message-manager-add-page">
            <ContentHeaderControl title="发布系统消息"></ContentHeaderControl>
            <FormMessageManager type={FormMessageManagerType.Add} onSubmit={topThis.onSubmit.bind(this)}></FormMessageManager>
        </Row></Spin>;
    }
}
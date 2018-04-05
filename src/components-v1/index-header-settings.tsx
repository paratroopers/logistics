import * as React from 'react';
import {hashHistory} from 'react-router';
import {PathConfig} from "../config/pathconfig";
import {Context} from "../util/common";
import {Cookies} from '../util/cookie';
import { Row, Col, Popover, Avatar, Menu, Icon, Modal, Form,Input } from 'antd';
import {HeaderMessage} from './index-header-message';
import { FormComponentProps } from "antd/lib/form";
import { APINameSpace } from "../model/api";
import { RequestNameSpace } from "../model/request";

interface HeaderSettingProps extends FormComponentProps {
    isLogin?: boolean;
}

interface HeaderSettingStates {
    isLogin?: boolean;
    isShowModal?:boolean;
    confirmLoading?:boolean;
}

 class HeaderSetting extends React.Component<HeaderSettingProps, HeaderSettingStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLogin: props.isLogin ? props.isLogin : false,
            isShowModal:false,
            confirmLoading:false
        }
    }

    componentWillReceiveProps(nextProps) {
        const topThis = this;
        const {props: {isLogin}} = topThis;
        if ('isLogin' in nextProps && nextProps.isLogin !== isLogin) {
            topThis.setState({isLogin: nextProps.isLogin});
        }
    }

    onClickUserMenu({item, key, keyPath}) {
        const topThis = this;
        switch (key) {
            case "0":
                hashHistory.push({pathname: PathConfig.MemberIndexPage});
                topThis.setState({isShowModal:true});
                break;
            case "2":
                Context.setMerchantData({isLogin: false});
                hashHistory.push({pathname: PathConfig.LoginPage});
                topThis.setState({isLogin: false});
                Cookies.remove("Authorization");

                // MememberAPI.LoginOut().then(result =>{
                //     if (result.Data == "True")
                //     {
                //
                //     }
                // });

                break;
            default:
                break;
        }
    }

    //密码校验 
    onHandleComfirmPassword=(rule,value,callback)=>{
        const {getFieldValue}=this.props.form;
           if(value && value.length > 20 || value.length < 6){
           callback("字符长度在6-20之间");
         }
        if(value&&this.props.form.isFieldTouched('newPwdAgain')) {
            this.props.form.validateFields(["newPwdAgain"], { force: true },callback());
        }
     
        callback();
    }

    onHandleComfirmPasswordAgain=(rule,value,callback)=>{
        const {getFieldValue}=this.props.form;
        
        if(value && value.length > 20 || value.length < 6){
            callback("字符长度在6-20之间");
         }
        if(value && value!==getFieldValue('newPwd')) {
            callback("两次密码不一致");
        }
    
        callback();
        
    }


    onSubmit(){
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){
               const request:RequestNameSpace.UpdatePwdRequest={
                   isAdmin:true,
                   ...values
               }           
                APINameSpace.MemberAPI.updatePwd(request).then(data=>{
                   if(data.Status===0){
                       this.setState({isShowModal:false});
                   }
                })
            }
        })
    }

    onrenderPasswordModal(){
        const { isShowModal,confirmLoading}=this.state;
        const { getFieldDecorator } =this.props.form;
        
        const modalprops={
            title:"修改密码",
            visible:isShowModal,
            confirmLoading:confirmLoading,
            onOk:()=>{
               this.onSubmit()
            },
            onCancel:()=>{
                this.setState({isShowModal:false});
            }
        }
        return <Modal {...modalprops}>
                 <Form>
                    <Form.Item 
                    label="旧密码"
                    labelCol={{span:8}}
                    wrapperCol={{span:16}}>
                         {
                           getFieldDecorator('srcPwd',{
                               rules:[{required:true,message:"请填写密码"}]
                           })(
                               <Input type="password" placeholder="输入当前密码"/>
                           ) 
                         }
                    </Form.Item>
                    <Form.Item 
                    label="新密码"
                    labelCol={{span:8}}
                    wrapperCol={{span:16}}>
                         {
                           getFieldDecorator('newPwd',{
                               rules:[{required:true,message:"请填写密码"},{
                                   validator:this.onHandleComfirmPassword
                               }]
                           })(
                               <Input type="password" placeholder="请输入6-20个字符"/>
                           ) 
                         }
                    </Form.Item>
                    <Form.Item 
                    label="确认密码"
                    labelCol={{span:8}}
                    wrapperCol={{span:16}}>
                         {
                           getFieldDecorator('newPwdAgain',{
                               rules:[{required:true,message:"请填写密码"},{
                                   validator:this.onHandleComfirmPasswordAgain,
                               }]
                           })(
                               <Input type="password" placeholder="请输入6-20个字符"/>
                           ) 
                         }
                    </Form.Item>
                </Form>
        </Modal>
            
    }

    renderUserNameContent() {
        return <Menu onClick={this.onClickUserMenu.bind(this)}>
            <Menu.Item key="0">
                <Icon type="unlock"/>
                <span>修改密码</span>
            </Menu.Item>

            <Menu.Divider></Menu.Divider>
            <Menu.Item key="2">
                <Icon type="poweroff"/>
                <span>退出</span>
            </Menu.Item>
        </Menu>;
    }

    render() {
        if (!this.state.isLogin) return <div></div>;
        try{
            const userName = Context.getCurrentUser().userInfo.MemeberCode;
            return <Row className="tool-user" type="flex" align="middle" justify="start">
                <Col className="tool-user-message">
                    <HeaderMessage></HeaderMessage>
                </Col>
                <Col className="tool-user-right">
                    <Popover placement="bottomRight"
                             overlayClassName="tool-user-popover"
                             autoAdjustOverflow={true}
                             content={this.renderUserNameContent()}
                             trigger="click">
                        <a className="tool-user-right-name">
                            <Avatar style={{marginRight: 5}} src="http://www.famliytree.cn/icon/timor.png"/>
                            <span>{userName}</span>
                        </a>
                    </Popover>
                </Col>
                {this.onrenderPasswordModal()}
            </Row>
        }catch (ex){
            return null;
        }
    }
}

export default Form.create<any>()(HeaderSetting);
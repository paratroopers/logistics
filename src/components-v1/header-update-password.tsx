import { FormComponentProps } from "antd/lib/form";
import * as React from "React";
import { Form, Modal, Input } from "antd";
import { RequestNameSpace } from "../model/request";
import { APINameSpace } from "../model/api";

interface HeaderUpdatePwdProps extends FormComponentProps {
    visible?:boolean;
    onCancel?:()=>void;
}

interface HeaderUpdatePwdState{
  
   confirmLoading?:boolean;
}

class HeaderUpdatePwd extends React.Component<HeaderUpdatePwdProps,HeaderUpdatePwdState>{
    constructor(props,context){
        super(props,context);
        this.state={
            confirmLoading:false
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
        this.setState({confirmLoading:true});
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){
               const request:RequestNameSpace.UpdatePwdRequest={
                   isAdmin:true,
                   ...values
               }           
                APINameSpace.MemberAPI.updatePwd(request).then(data=>{
                   if(data.Status===0){
                      this.setState({confirmLoading:false});
                      this.props.onCancel();
                   }
                });
            }
        })
    }

    render(){
              const {confirmLoading}=this.state;
        const { getFieldDecorator } =this.props.form;
        
        const modalprops={
            title:"修改密码",
            visible:this.props.visible,
            confirmLoading:confirmLoading,
            onOk:()=>{
               this.onSubmit()
            },
            onCancel:()=>{
                  this.props.form.resetFields();
                  this.props.onCancel();
            }
        }
        return <Modal {...modalprops}>
                 <Form>
                    <Form.Item 
                    label="旧密码"
                    labelCol={{span:6}}
                    wrapperCol={{span:18}}>
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
                    labelCol={{span:6}}
                    wrapperCol={{span:18}}>
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
                    labelCol={{span:6}}
                    wrapperCol={{span:18}}>
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
}

export default Form.create<any>()(HeaderUpdatePwd);
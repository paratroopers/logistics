import * as React from 'react';
import {FormMessageList} from './form-message-list';

interface FormStepIconProps {
    type?: FormStepEnum;
    size?: number;
    className?: string;
}

interface FormStepIconStates {
}

export enum FormStepEnum {
    WarehouseIn = 0,
    CustomerServiceConfirm = 1,
    WarehousePackge = 2,
    WaitForPay = 3,
    Delivered = 4
}

export class FormStepIcon extends React.Component<FormStepIconProps, FormStepIconStates> {


    renderIcon() {
        let icon = "";
        const size = this.props.size;
        const style = size ? {fontSize: size + 'px', lineHeight: size + 'px'} : {};
        const color = FormMessageList.defaultColor;
        switch (this.props.type) {
            case  FormStepEnum.Delivered:
                return <i style={style} className={"iconfont icon-daifahuosel " + color.Delivered}></i>;
            case  FormStepEnum.WaitForPay:
                return <i style={style} className={"iconfont icon-fukuansel " + color.WaitForPay}></i>;
            case  FormStepEnum.WarehousePackge:
                return <i style={style}
                          className={"iconfont icon-yuanxingxuanzhong-fill " + color.WarehousePackge}></i>;
            case  FormStepEnum.CustomerServiceConfirm:
                return <i style={style}
                          className={"iconfont icon-qunfengkefujingli " + color.CustomerServiceConfirm}></i>;
            case  FormStepEnum.WarehouseIn:
                return <i style={style} className={"iconfont icon-rukuguanli " + color.WarehouseIn}></i>;
        }
        return " iconfont " + icon;
    }

    render() {
        return <div className='message-step-icon'>{this.renderIcon()}</div>;
    }
}
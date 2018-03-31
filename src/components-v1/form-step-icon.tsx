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
    WaitForPay = 2,
    Delivered = 4,
    WaitForPack = 5
}

export class FormStepIcon extends React.Component<FormStepIconProps, FormStepIconStates> {
    renderIcon() {
        let icon = "";
        const size = this.props.size;
        const style = size ? {fontSize: size + 'px', lineHeight: size + 'px'} : {};
        const color = FormMessageList.defaultColor;
        switch (this.props.type) {
            case  FormStepEnum.Delivered:
                return <i style={style} className={"iconfont icon-rukuguanli " + color.Delivered}></i>;
            case  FormStepEnum.WaitForPay:
                return <i style={style} className={"iconfont icon-fukuansel " + color.WaitForPay}></i>;
            case  FormStepEnum.WarehouseIn:
                return <i style={style} className={"iconfont icon-yuanxingxuanzhong-fill " + color.WarehouseIn}></i>;
            case  FormStepEnum.WaitForPack:
                return <i style={style} className={"iconfont icon-yuanxingxuanzhong-fill " + color.WaitForPack}></i>;
        }
        return " iconfont " + icon;
    }

    render() {
        return <div className='message-step-icon'>{this.renderIcon()}</div>;
    }
}
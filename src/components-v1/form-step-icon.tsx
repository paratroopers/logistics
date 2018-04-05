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
    WaitForPay = 3,
    Delivered = 4,
    WaitForPack = 0
}

export class FormStepIcon extends React.Component<FormStepIconProps, FormStepIconStates> {
    renderIcon() {
        let icon = "";
        const size = this.props.size;
        const style = size ? {fontSize: size + 'px', lineHeight: size + 'px'} : {};
        const color = FormMessageList.defaultColor;
        switch (this.props.type) {
            case  FormStepEnum.Delivered:
                return <i key={0} style={style} className={"iconfont icon-daifahuosel " + color.Delivered}></i>;
            case  FormStepEnum.WaitForPay:
                return <i key={1} style={style} className={"iconfont icon-fukuansel " + color.WaitForPay}></i>;
            case  FormStepEnum.WaitForPack:
                return <i key={2} style={style} className={"iconfont icon-jianyanceshizhenglidabao " + color.WaitForPack}></i>;
        }

        return " iconfont " + icon;
    }

    render() {
        return <div className='message-step-icon'>{this.renderIcon()}</div>;
    }
}
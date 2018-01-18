import * as React from 'react';
import {Avatar} from 'antd';

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
    }

    render() {
        const size = this.props.size;
        const style = size ? {width: size, height: size, borderRadius: size} : {};
        return <Avatar className={this.props.className} style={style}
                       src="http://www.famliytree.cn/icon/message.png"/>;
    }
}
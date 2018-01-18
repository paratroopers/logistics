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
        let icon = "";
        const size = this.props.size;
        const style = size ? {fontSize: size+ 'px', lineHeight: size + 'px'} : {};
        switch (this.props.type) {
            case  FormStepEnum.Delivered:
                return <i style={style} className="iconfont icon-fahuoxinxi"></i>;
            case  FormStepEnum.WaitForPay:
                return <i style={style} className="iconfont icon-daifukuan"></i>;
            case  FormStepEnum.WarehousePackge:
                return <i style={style} className="iconfont icon-cangkumingcheng"></i>;
            case  FormStepEnum.CustomerServiceConfirm:
                return <i style={style} className="iconfont icon-custom-service"></i>;
            case  FormStepEnum.WarehouseIn:
                return <i style={style} className="iconfont icon-ruku1"></i>;
        }
        return " iconfont " + icon;
    }

    render() {
        return <div>{this.renderIcon()}</div>;
    }
}
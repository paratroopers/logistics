/**
 * 表格操作控件
 * Created by Handy
 * */
import * as React from 'react';
import {Dropdown, Menu, Icon} from 'antd';
import {ClickParam} from "antd/lib/menu";
import {Context} from '../util/common';
import {PathConfig} from '../config/pathconfig';

export class FormTableOperationModel {
    key: FormTableOperationEnum;
    type?: string;
    label: string;
    path?: string;
}

export enum FormTableOperationEnum {
    Edit = 0,
    View = 1,
    Detele = 2
}

interface FormTableOperationProps {
    onClick?: (a: ClickParam) => void;
    value: FormTableOperationModel[]
}

interface FormTableOperationStates {

}

export class FormTableOperation extends React.Component<FormTableOperationProps, FormTableOperationStates> {
    constructor(props, content) {
        super(props, content);
    }

    render() {
        const topThis = this;
        const {props: {value, onClick}} = topThis;


        const menu = <Menu onClick={onClick}>
            {value.length === 1 ? <a onClick={() => {
                value[0].path
            }}>{value[0].label}</a> : value.map(item => <Menu.Item key={item.key}>
                <span>{item.type ?
                    <Icon style={{fontSize: 14, margin: "4px 8px 4px 0px"}}
                          type={item.type}></Icon> : null}{item.label}</span>
            </Menu.Item>)}
        </Menu>;

        return <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <i className={Context.getIconClassName("icon-ellipsisv")}/>
        </Dropdown>;
    }
}
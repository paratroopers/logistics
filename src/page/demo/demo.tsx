import * as React from 'react';
import {withRouter} from 'react-router';
import { Input } from 'antd';
import { Menu, Dropdown, Icon } from 'antd';

interface DemoStates {

}

interface DemoProps {

}

@withRouter
export class DemoPage extends React.Component<DemoProps, DemoStates> {
    constructor(props) {
        super(props);
    }
    objCustom:CustomObj = {i:"11"};

    render() {

        return <div></div>
    }
}

interface CustomObj{

}

interface CustomInputProps{

}

interface  CustomInputStates{

}


export class CustomInput extends React.Component<CustomInputProps, CustomInputStates> {

    render() {
      return  <div>11</div>
    }
}

interface CustomDropProps{
}

interface  CustomDropStates{

}
export  class  CustomDropdown extends React.Component<CustomDropProps, CustomDropStates> {

     menu:any = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
            </Menu.Item>
        </Menu>
    );

    render(){
        return  <Dropdown overlay={this.menu}>
            <a className="ant-dropdown-link" href="#">
                Hover me <Icon type="down" />
            </a>
        </Dropdown> ;
    }
}
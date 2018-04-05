import * as React from 'react';
import {withRouter} from 'react-router';
import {WebAction} from "../actions/index";
import {Row} from 'antd';
import {Global} from "../util/common";

interface DemoStates {

}

interface DemoProps {

}

@withRouter
export class DemoPage extends React.Component<DemoProps, DemoStates> {
    constructor(props) {
        super(props);
    }



    render() {
        return <Row className="demo-page">
            <a onClick={()=>{
                Global.store.dispatch(WebAction.onRunSagaDemo());
            }}>测试Saga</a>
        </Row>
    }
}


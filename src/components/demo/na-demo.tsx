import * as React from "react";
import {Component} from "react";
import {Row} from 'antd';
import {connect} from "react-redux";


import {DemoAPI} from '../../api/common-api';

interface DemoControlProps {
    todoCount?: any;
    claimCount?: any;
}

interface DemoControlStates {

}

class DemoControl extends Component<DemoControlProps, DemoControlStates> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        DemoAPI.GetDemo().then(result => {
            console.log(result);
        });
    }

    render() {
        const topThis = this;
        const {props: {todoCount,claimCount}} = topThis;
        return (<Row>
                {todoCount + '-' + claimCount}
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {todoCount: state.task.todoCount, claimCount: state.task.claimCount};
};

export default connect(mapStateToProps)(DemoControl);

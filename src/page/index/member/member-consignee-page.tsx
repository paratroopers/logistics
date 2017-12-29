import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
interface MemberConsigneePageProps {
}

interface MemberConsigneePageStates {
}

@withRouter
export class MemberConsigneePage extends Component<MemberConsigneePageProps, MemberConsigneePageStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            收货地址
        </div>;
    }
}

import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
interface NaVIPConsigneeAddressPageProps {
}

interface NaVIPConsigneeAddressPageStates {
}

@withRouter
export class NaVIPConsigneeAddressPage extends Component<NaVIPConsigneeAddressPageProps, NaVIPConsigneeAddressPageStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            收货地址
        </div>;
    }
}

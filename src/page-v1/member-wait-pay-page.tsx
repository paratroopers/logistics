import * as React from 'react';
import {withRouter} from 'react-router';
import {FormComponentProps} from "antd/lib/form";
import {PathConfig} from '../config/pathconfig';
import {FormTablePage, dropDownModel} from '../components-v1/form-table-page';

/// 待审核列表
interface MemberWaitPayPageProps extends FormComponentProps {

}

interface MemberWaitPayPageStates {
}

@withRouter
export class MemberWaitPayPage extends React.Component<MemberWaitPayPageProps, MemberWaitPayPageStates> {
    constructor(props, context) {
        super(props, context);
    }

    getDropDownConfig() {
        const options: dropDownModel = {
            items: [{
                key: PathConfig.MemberAddressPageView,
                type: "search",
                label: "审核"
            },
                {
                    key: PathConfig.MemberAddressPageEdit,
                    type: "edit",
                    label: "查看"
                }
            ],
            editPath: PathConfig.MemberWaitPayApprovePage
        };
        return options;
    }

    render() {
        return <FormTablePage dropDownConfig={this.getDropDownConfig()}
                              callBackTitle="订单确认"
                              headerTip={'总计有{name}项待审批'}></FormTablePage>;
    }
}
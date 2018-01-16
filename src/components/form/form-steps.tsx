import * as React from 'react';
import {Steps, Icon} from 'antd';
import {StepsProps} from 'antd/lib/steps'

interface FormStepsProps extends StepsProps {
    data?: FormStepsData[];
    itemClassStyle?: any;
}

interface FormStepsStates {
}

export interface FormStepsData {
    status?: string;
    title?: string;
    icon?: string;
    description?: string;
}

export class FormSteps extends React.Component<FormStepsProps, FormStepsStates> {
    static defaultConfig = {
        direction: 'horizontal'
    }

    renderSteps() {
        const {itemClassStyle} = this.props;
        return this.props.data.map(d => {
            return <Steps.Step style={itemClassStyle} status={d.status} title={d.title} description={d.description}
                               icon={<Icon type={d.icon}/>}/>;
        });
    }


    render() {
        const {props} = this;
        return <Steps {...props} current={1}>
            {this.renderSteps()}
        </Steps>
    }
}
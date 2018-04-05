import * as React from 'react';
import {Steps} from 'antd';
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
    icon?: any;
    description?: string;
}

export class FormSteps extends React.Component<FormStepsProps, FormStepsStates> {
    static defaultConfig = {
        direction: 'horizontal'
    }

    renderSteps() {
        const {itemClassStyle} = this.props;
        return this.props.data.map((d, i) => {
            return <Steps.Step style={itemClassStyle}
                               key={i}
                               status={d.status}
                               title={d.title}
                               description={d.description}
                               icon={d.icon}/>;
        });
    }


    render() {
        const {props: {itemClassStyle, data, ...otherprops}} = this;
        return <Steps {...otherprops} current={1}>
            {this.renderSteps()}
        </Steps>
    }
}
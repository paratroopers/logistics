import * as React from 'react';
import {Util} from "../util/util";
import {withRouter} from "react-router";
import {ModelNameSpace} from '../model/model';
import {MasterMobilePage} from './master-mobile-page';
import MasterWebPage from './master-web-page';

interface NaMasterMainPageProps {
    children?: any;
}

interface NaMasterMainPageStates {
    mode: ModelNameSpace.ScreenModeEnum;

}

let timeout;
let currentValue;

@withRouter
export class NaMasterMainPage extends React.Component<NaMasterMainPageProps, NaMasterMainPageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            mode: Util.getScrrenMode(window.innerWidth)
        }
    }

    /**
     * 监视屏幕
     **/
    onWindowResize() {
        const topThis = this;
        const {state: {mode}} = topThis;
        topThis.fetch(window.innerWidth, (data) => {
            // console.log(data);
            if ((data === ModelNameSpace.ScreenModeEnum.sm && mode !== ModelNameSpace.ScreenModeEnum.sm) || (data !== ModelNameSpace.ScreenModeEnum.sm && mode === ModelNameSpace.ScreenModeEnum.sm)) {
                topThis.setState({mode: data});
            }
        });
    }

    /**
     * 获取最终mode
     * */
    fetch(value, callback) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        function fake() {
            if (currentValue === value) {
                callback(Util.getScrrenMode(value));
            }
        }

        timeout = setTimeout(fake, 1000);
    }

    componentWillMount() {
        const topThis = this;

        /* 装载事件-监视屏幕大小*/
        window.addEventListener('resize', topThis.onWindowResize.bind(this));
    }

    componentWillUnmount() {
        const topThis = this;
        /* 卸载-监视屏幕大小*/
        window.removeEventListener('resize', topThis.onWindowResize.bind(this))
    }

    render() {
        const topThis = this;
        const {props: {children}, state: {mode}} = topThis;
        const Master = (mode === ModelNameSpace.ScreenModeEnum.sm) ?
            <MasterMobilePage>{children}</MasterMobilePage> :
            <MasterWebPage>{children}</MasterWebPage>;
        return Master;
    }
}

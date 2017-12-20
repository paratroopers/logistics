import * as React from "react";
import {Component} from "react";
import {ReducersMapObject, createStore, combineReducers} from "redux";
import {Provider} from "react-redux";
import {getLocale} from "../../locales";
import {AppLocaleStatic, ScreenModeEnum} from "../../api/model/common-model";
import NaLocalProvider from '../../components/controls/na-localprovider';
import {NaGlobal} from "../../util/common";
import {NaUtil} from "../../util/util";

interface NaMasterPageProps extends ReactRouter.RouteComponentProps<any, any> {
    onLoaded?: (appLocale?: AppLocaleStatic, theme?: string) => Promise<any>;
    reducers?: ReducersMapObject;
    cdn?: string;
}

interface NaMasterPageStates {

}

class NaMasterPage extends Component<NaMasterPageProps, NaMasterPageStates> {
    constructor(props, context) {
        super(props, context);
        window["CDN"] = 'http://www.famliytree.cn/'//this.props.cdn;
        console.log(this.props.cdn);
        this.initRedux();
    }

    initRedux() {
        NaGlobal.store = createStore(combineReducers(this.props.reducers)); //创建store
        //Window.prototype.naDispatch = (action) => NaGlobal.store.dispatch(action); //给window对象增加dispatch action方法
    }

    render() {
        const topThis = this;
        const {props: {children}} = topThis;
        return <Provider store={NaGlobal.store}>
            <NaLocalProvider>{children}</NaLocalProvider>
        </Provider>;
    }
}

export default NaMasterPage;
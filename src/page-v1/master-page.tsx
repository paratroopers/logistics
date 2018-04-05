import * as React from "react";
import {Component} from "react";
import {ReducersMapObject, createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {ModelNameSpace} from '../model/model';
import rootSaga from '../sagas/index';
import LocalProvider from '../components-v1/common-localprovider';
import {Global} from "../util/common";
import {message} from 'antd';
import createSagaMiddleware from 'redux-saga';

interface MasterPageProps extends ReactRouter.RouteComponentProps<any, any> {
    onLoaded?: (appLocale?: ModelNameSpace.AppLocaleStatic, theme?: string) => Promise<any>;
    reducers?: ReducersMapObject;
    cdn?: string;
}

interface MasterPageStates {

}

class MasterPage extends Component<MasterPageProps, MasterPageStates> {
    constructor(props, context) {
        super(props, context);
        window["CDN"] = 'http://www.famliytree.cn/'//this.props.cdn;
        //console.log(this.props.cdn);
        this.initRedux();
        const messageTop = window.innerHeight * 0.1;
        message.config({top: messageTop});
    }

    initRedux() {
        Global.saga = createSagaMiddleware();
        Global.store = createStore(combineReducers(this.props.reducers), applyMiddleware(Global.saga)); //创建store
        Global.saga.run(rootSaga);
        //Window.prototype.naDispatch = (action) => Global.store.dispatch(action); //给window对象增加dispatch action方法
    }

    render() {
        const topThis = this;
        const {props: {children}} = topThis;
        return <Provider store={Global.store}>
            <LocalProvider>{children}</LocalProvider>
        </Provider>;
    }
}

export default MasterPage;
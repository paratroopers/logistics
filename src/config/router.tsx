import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {PathConfig} from './pathconfig';
import {NaDemoPage, NaHomePage, NaMobileTabBar,NaVIPCenterPage} from '../page/index';

const routerConfig = (
    <Router history={hashHistory}>
        <IndexRoute component={NaHomePage}></IndexRoute>
        <Route path={PathConfig.DemoPage} component={NaDemoPage}/>
        <Route path={PathConfig.HomePage} component={NaHomePage}/>
        <Route path={PathConfig.MobilePage} component={NaMobileTabBar}/>
        <Route path={PathConfig.VIPCenterPage} component={NaVIPCenterPage}/>

    </Router>
);
export default routerConfig;



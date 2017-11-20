import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {PathConfig} from './pathconfig';
import {NaDemoPage,NaHomePage} from '../page/index';

const routerConfig = (
    <Router history={hashHistory}>
        <IndexRoute component={NaHomePage}></IndexRoute>
        <Route path={PathConfig.DemoPage} component={NaDemoPage}/>
        <Route path={PathConfig.HomePage} component={NaHomePage}/>
    </Router>
);
export default routerConfig;
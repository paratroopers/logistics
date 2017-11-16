import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {PathConfig} from './pathconfig';
import {HomePage} from '../page/index';

const routerConfig = (
    <Router history={hashHistory}>
        <IndexRoute component={HomePage}></IndexRoute>
        <Route path={PathConfig.HomePage} component={HomePage}/>
    </Router>
);
export default routerConfig;
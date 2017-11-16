import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {PathConfig} from './pathconfig';
import {DemoPage, DemoTimeLinePage, MySpacePage,DemoCarouselPage} from '../page/app';

const routerConfig = (
    <Router history={hashHistory}>
        <IndexRoute component={DemoPage}></IndexRoute>
        <Route path={PathConfig.DemoPage} component={DemoPage}/>
        <Route path={PathConfig.DemoTimeLinePage} component={DemoTimeLinePage}/>
        <Route path={PathConfig.DemoCarouselPage} component={DemoCarouselPage}/>
        <Route path={PathConfig.MySpacePage} component={MySpacePage}/>
    </Router>
);
export default routerConfig;
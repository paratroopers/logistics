import * as React from "react";
import { render } from "react-dom";
import { reducers } from "./reducers/index";
import router from "./config/router";
import {MasterPage} from "./page/master/master-page";

require.ensure([], () => {
    require("./themes/index.less")
}, "app.css");

render(<MasterPage reducers={reducers}>{router}</MasterPage>, document.getElementById("app_content"));

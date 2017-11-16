import * as React from "react";
import { render } from "react-dom";
import router from "./config/router";
import {MasterPage} from "./page/master/master-page";

/* index中master母版内容的全部样式*/
require.ensure([], () => {
    require("./themes/master.less")
}, "app.css");

render(<MasterPage>{router}</MasterPage>, document.getElementById("app_content"));

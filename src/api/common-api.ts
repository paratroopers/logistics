import {DemoRequest} from "./model/request/common-request";
import {Request} from '../util/request';

export class DemoAPI {
    static async GetDemo(data?: DemoRequest) {
        let url: string = "sockjs-node/info";
        return new Request<NaRequest,
            NaResponse>().get(url, data);
    }
}

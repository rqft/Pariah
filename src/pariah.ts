import { Methods, Options } from "./constants";
import { Requester } from "./requester";

export class Pariah extends Requester {
    protected _init: Options;
    constructor(url: URL, init: Options = {}) {
        super(url, undefined, init);

        this._init = init;
    }
    protected build(method: Methods) {
        const payload = new Requester(this.url, method, this._init);
        return Object.assign(payload, payload.request);
    }
    public get = this.build(Methods.GET);
    public post = this.build(Methods.POST);
    public put = this.build(Methods.PUT);
    public delete = this.build(Methods.DELETE);
    public patch = this.build(Methods.PATCH);
    public head = this.build(Methods.HEAD);
    public options = this.build(Methods.OPTIONS);
    public connect = this.build(Methods.CONNECT);
    public trace = this.build(Methods.TRACE);
}

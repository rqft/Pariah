"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passwordinator = void 0;
const base_1 = require("../lib/base");
class Passwordinator {
    raw;
    constructor() {
        this.raw = new base_1.Pariah({ baseUrl: "https://passwordinator.herokuapp.com/" });
    }
    async run() {
        return this.raw.getJSON("/generate");
    }
}
exports.Passwordinator = Passwordinator;

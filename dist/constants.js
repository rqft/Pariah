"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_OPTIONS = exports.HTTPVerbs = void 0;
var HTTPVerbs;
(function (HTTPVerbs) {
    HTTPVerbs["GET"] = "GET";
    HTTPVerbs["POST"] = "POST";
    HTTPVerbs["PUT"] = "PUT";
    HTTPVerbs["DELETE"] = "DELETE";
    HTTPVerbs["PATCH"] = "PATCH";
    HTTPVerbs["HEAD"] = "HEAD";
    HTTPVerbs["OPTIONS"] = "OPTIONS";
    HTTPVerbs["CONNECT"] = "CONNECT";
    HTTPVerbs["TRACE"] = "TRACE";
    HTTPVerbs["COPY"] = "COPY";
    HTTPVerbs["LINK"] = "LINK";
    HTTPVerbs["UNLINK"] = "UNLINK";
    HTTPVerbs["PURGE"] = "PURGE";
    HTTPVerbs["LOCK"] = "LOCK";
    HTTPVerbs["UNLOCK"] = "UNLOCK";
    HTTPVerbs["PROPFIND"] = "PROPFIND";
    HTTPVerbs["VIEW"] = "VIEW";
})(HTTPVerbs = exports.HTTPVerbs || (exports.HTTPVerbs = {}));
exports.DEFAULT_OPTIONS = {
    method: HTTPVerbs.GET,
    headers: {
        "Content-Type": "application/json",
        "User-Agent": "Pariah",
    },
};

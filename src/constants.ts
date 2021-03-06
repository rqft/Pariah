import { Agent } from "http";
import { Headers, RequestRedirect } from "node-fetch";
import { AbortSignal } from "node-fetch/externals";

export enum HTTPVerbs {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    CONNECT = "CONNECT",
    TRACE = "TRACE",
    COPY = "COPY",
    LINK = "LINK",
    UNLINK = "UNLINK",
    PURGE = "PURGE",
    LOCK = "LOCK",
    UNLOCK = "UNLOCK",
    PROPFIND = "PROPFIND",
    VIEW = "VIEW",
}

export type Options = {
    method?: HTTPVerbs;
    body?: any;
    headers?: Record<string, string> | Array<Array<string>> | Headers;
    redirect?: RequestRedirect;
    signal?: AbortSignal;
    agent?: Agent | ((parsedUrl: URL) => Agent);
    compress?: boolean;
    follow?: number;
    size?: number;
    timeout?: number;
};

export const DEFAULT_OPTIONS: Options = {
    method: HTTPVerbs.GET,
    headers: {
        "Content-Type": "application/json",
        "User-Agent": "Pariah",
    },
};

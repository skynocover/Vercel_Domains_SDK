"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VercelDeleteDomain = exports.VercelUpdateDomain = exports.VercelGetDomains = exports.VercelAddDomain = exports.Init = void 0;
const axios_1 = __importDefault(require("axios"));
let token = null;
let projectId = null;
/**
 * Init SDK
 * @param projectID vercel project id
 * @param Token vercel access token
 */
const Init = (projectID, Token) => {
    token = Token;
    projectId = projectID;
};
exports.Init = Init;
/**
 * Add new domain to project
 * @param name domain name
 * @param gitBranch Git branch to link the project domain
 * @param redirect Target destination domain for redirect
 * @param redirectStatusCode Status code for domain redirect
 */
const VercelAddDomain = (name, gitBranch = undefined, redirect = undefined, redirectStatusCode = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!projectId || !token) {
            return { errorMessages: "Please Init first" };
        }
        const { data } = yield (0, axios_1.default)({
            method: "POST",
            url: `https://api.vercel.com/v8/projects/${projectId}/domains`,
            data: { name, gitBranch, redirect, redirectStatusCode },
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + token,
            },
        });
        return { data };
    }
    catch (error) {
        return {
            errorMessages: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data.error.message) || error.message,
        };
    }
});
exports.VercelAddDomain = VercelAddDomain;
/**
 * get all domain from project
 */
const VercelGetDomains = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!projectId || !token) {
            return { errorMessages: "Please Init first" };
        }
        const { data } = yield (0, axios_1.default)({
            method: "GET",
            url: `https://api.vercel.com/v8/projects/${projectId}/domains`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + token,
            },
        });
        return { domains: data.domains };
    }
    catch (error) {
        return { errorMessages: error.message };
    }
});
exports.VercelGetDomains = VercelGetDomains;
/**
 * Update domain to project
 * @param name domain name
 * @param gitBranch Git branch to link the project domain
 * @param redirect Target destination domain for redirect
 * @param redirectStatusCode Status code for domain redirect
 */
const VercelUpdateDomain = (domain, gitBranch = undefined, redirect = undefined, redirectStatusCode = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!projectId || !token) {
            return { errorMessages: "Please Init first" };
        }
        const { data } = yield (0, axios_1.default)({
            method: "PATCH",
            url: `https://api.vercel.com/v8/projects/${projectId}/domains/${domain}`,
            data: {
                gitBranch,
                redirect,
                redirectStatusCode,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + token,
            },
        });
        return { domains: data.domains };
    }
    catch (error) {
        console.error(error.response);
        return {
            errorMessages: ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data.error.message) || error.message,
        };
    }
});
exports.VercelUpdateDomain = VercelUpdateDomain;
/**
 * Delete domain from project
 * @param name domain name
 */
const VercelDeleteDomain = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        if (!projectId || !token) {
            return { errorMessages: "Please Init first" };
        }
        const { data } = yield (0, axios_1.default)({
            method: "DELETE",
            url: `https://api.vercel.com/v8/projects/${projectId}/domains/${domain}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + token,
            },
        });
        return { data };
    }
    catch (error) {
        console.error(error.response);
        return {
            errorMessages: ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data.error.message) || error.message,
        };
    }
});
exports.VercelDeleteDomain = VercelDeleteDomain;

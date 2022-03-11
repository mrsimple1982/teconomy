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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.sleep = void 0;
var arbundles_1 = require("arbundles");
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
exports.sleep = sleep;
var Uploader = /** @class */ (function () {
    function Uploader(api, utils, currency, currencyConfig) {
        this.api = api;
        this.currency = currency;
        this.currencyConfig = currencyConfig;
        this.utils = utils;
    }
    /**
     * Uploads data to the bundler
     * @param data
     * @param tags
     * @returns the response from the bundler
     */
    Uploader.prototype.upload = function (data, tags) {
        return __awaiter(this, void 0, void 0, function () {
            var signer, dataItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.currencyConfig.getSigner()];
                    case 1:
                        signer = _a.sent();
                        dataItem = (0, arbundles_1.createData)(data, signer, { tags: tags });
                        return [4 /*yield*/, dataItem.sign(signer)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.dataItemUploader(dataItem)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Uploads a given dataItem to the bundler
     * @param dataItem
     */
    Uploader.prototype.dataItemUploader = function (dataItem) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, protocol, host, port, timeout, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.api.getConfig(), protocol = _a.protocol, host = _a.host, port = _a.port, timeout = _a.timeout;
                        return [4 /*yield*/, this.api.post(protocol + "://" + host + ":" + port + "/tx/" + this.currency, dataItem.getRaw(), {
                                headers: { "Content-Type": "application/octet-stream" },
                                timeout: timeout,
                                maxBodyLength: Infinity
                            })];
                    case 1:
                        res = _b.sent();
                        switch (res.status) {
                            case 201:
                                res.data = { id: dataItem.id };
                                return [2 /*return*/, res];
                            case 402:
                                throw new Error("Not enough funds to send data");
                            default:
                                if (res.status >= 400) {
                                    throw new Error("whilst uploading DataItem: " + res.status + " " + res.statusText);
                                }
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return Uploader;
}());
exports["default"] = Uploader;

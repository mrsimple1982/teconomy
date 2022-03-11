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
var bignumber_js_1 = require("bignumber.js");
bignumber_js_1["default"].set({ DECIMAL_PLACES: 50 });
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
exports.sleep = sleep;
var Utils = /** @class */ (function () {
    function Utils(api, currency, currencyConfig) {
        this.api = api;
        this.currency = currency;
        this.currencyConfig = currencyConfig;
    }
    ;
    /**
     * Throws an error if the provided axios reponse has a status code != 200
     * @param res an axios response
     * @returns nothing if the status code is 200
     */
    Utils.checkAndThrow = function (res, context, exceptions) {
        if ((res === null || res === void 0 ? void 0 : res.status) && !(exceptions !== null && exceptions !== void 0 ? exceptions : []).includes(res.status) && res.status != 200) {
            throw new Error("HTTP Error: " + context + ": " + res.status + " " + (typeof res.data !== "string" ? res.statusText : res.data));
        }
        return;
    };
    /**
     * Gets the nonce used for withdrawal request validation from the bundler
     * @returns nonce for the current user
     */
    Utils.prototype.getNonce = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get("/account/withdrawals/" + this.currency + "?address=" + this.currencyConfig.address)];
                    case 1:
                        res = _a.sent();
                        Utils.checkAndThrow(res, "Getting withdrawal nonce");
                        return [2 /*return*/, (res).data];
                }
            });
        });
    };
    /**
     * Gets the balance on the current bundler for the specified user
     * @param address the user's address to query
     * @returns the balance in winston
     */
    Utils.prototype.getBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get("/account/balance/" + this.currency + "?address=" + address)];
                    case 1:
                        res = _a.sent();
                        Utils.checkAndThrow(res, "Getting balance");
                        return [2 /*return*/, new bignumber_js_1["default"](res.data.balance)];
                }
            });
        });
    };
    /**
     * Queries the bundler to get it's address for a specific currency
     * @returns the bundler's address
     */
    Utils.prototype.getBundlerAddress = function (currency) {
        return __awaiter(this, void 0, void 0, function () {
            var res, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get("/info")];
                    case 1:
                        res = _a.sent();
                        Utils.checkAndThrow(res, "Getting Bundler address");
                        address = res.data.addresses[currency];
                        if (!address) {
                            throw new Error("Specified bundler does not support currency " + currency);
                        }
                        return [2 /*return*/, address];
                }
            });
        });
    };
    /**
     * Calculates the price for [bytes] bytes paid for with [currency] for the loaded bundlr node.
     * @param currency
     * @param bytes
     * @returns
     */
    Utils.prototype.getPrice = function (currency, bytes) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get("/price/" + currency + "/" + bytes)];
                    case 1:
                        res = _a.sent();
                        Utils.checkAndThrow(res, "Getting storage cost");
                        return [2 /*return*/, new bignumber_js_1["default"]((res).data)];
                }
            });
        });
    };
    /**
     * Polls for transaction confirmation (or at least pending status) - used for fast currencies (i.e not arweave)
     * before posting the fund request to the server (so the server doesn't have to poll)
     * @param txid
     * @returns
     */
    Utils.prototype.confirmationPoll = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.currency === "arweave") {
                            return [2 /*return*/];
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 15)) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, exports.sleep)(3000)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.currencyConfig.getTx(txid).then(function (v) { return v === null || v === void 0 ? void 0 : v.confirmed; })["catch"](function (_) { return false; })];
                    case 3:
                        if (_a.sent()) {
                            return [2 /*return*/];
                        }
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: throw new Error("Tx " + txid + " didn't finalize after 30 seconds");
                }
            });
        });
    };
    Utils.prototype.unitConverter = function (baseUnits) {
        return new bignumber_js_1["default"](baseUnits).dividedBy(this.currencyConfig.base[1]);
    };
    return Utils;
}());
exports["default"] = Utils;

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
exports.withdrawBalance = void 0;
var arbundles_1 = require("arbundles");
var utils_1 = require("arweave/node/lib/utils");
var utils_2 = require("./utils");
var bignumber_js_1 = require("bignumber.js");
var base64url_1 = require("base64url");
/**
 * Create and send a withdrawal request
 * @param utils Instance of Utils
 * @param api Instance of API
 * @param wallet Wallet to use
 * @param amount amount to withdraw in winston
 * @returns the response from the bundler
 */
function withdrawBalance(utils, api, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var c, pkey, data, deephash, _a, isValid, cpk, csig, dh2, isValid2, isValid3, res;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    c = utils.currencyConfig;
                    return [4 /*yield*/, c.getPublicKey()];
                case 1:
                    pkey = _c.sent();
                    _b = { publicKey: pkey, currency: utils.currency, amount: new bignumber_js_1["default"](amount).toString() };
                    return [4 /*yield*/, utils.getNonce()];
                case 2:
                    data = (_b.nonce = _c.sent(), _b.signature = undefined, _b);
                    return [4 /*yield*/, (0, arbundles_1.deepHash)([(0, utils_1.stringToBuffer)(data.currency), (0, utils_1.stringToBuffer)(data.amount.toString()), (0, utils_1.stringToBuffer)(data.nonce.toString())])];
                case 3:
                    deephash = _c.sent();
                    if (!Buffer.isBuffer(data.publicKey)) {
                        data.publicKey = Buffer.from(data.publicKey);
                    }
                    // const a = data.publicKey.toString(); //fine
                    // console.log(a)
                    _a = data;
                    return [4 /*yield*/, c.sign(deephash)];
                case 4:
                    // const a = data.publicKey.toString(); //fine
                    // console.log(a)
                    _a.signature = _c.sent();
                    return [4 /*yield*/, c.verify(data.publicKey, deephash, data.signature)
                        // const opk = Buffer.from(data.publicKey)
                        // const osig = data.signature; // (uint8array)
                    ];
                case 5:
                    isValid = _c.sent();
                    // const opk = Buffer.from(data.publicKey)
                    // const osig = data.signature; // (uint8array)
                    data.publicKey = base64url_1["default"].encode(data.publicKey);
                    data.signature = base64url_1["default"].encode(data.signature);
                    cpk = base64url_1["default"].toBuffer(data.publicKey);
                    csig = base64url_1["default"].toBuffer(data.signature);
                    return [4 /*yield*/, (0, arbundles_1.deepHash)([(0, utils_1.stringToBuffer)(data.currency), (0, utils_1.stringToBuffer)(data.amount.toString()), (0, utils_1.stringToBuffer)(data.nonce.toString())])
                        // console.log(cpk.equals(opk));
                        // console.log(csig.equals(osig))
                        // TODO: remove check once paranoia is gone
                    ];
                case 6:
                    dh2 = _c.sent();
                    return [4 /*yield*/, c.verify(cpk, dh2, csig)];
                case 7:
                    isValid2 = _c.sent();
                    isValid3 = c.ownerToAddress(c.name == "arweave" ? base64url_1["default"].decode(data.publicKey) : base64url_1["default"].toBuffer(data.publicKey)) === c.address;
                    // console.log({ opk, osig })
                    // console.log(isValid2)
                    // console.log(isValid)
                    if (!(isValid || isValid2 || isValid3)) {
                        throw new Error("Internal withdrawal validation failed - please report this!\nDebug Info:" + JSON.stringify(data));
                    }
                    return [4 /*yield*/, api.post("/account/withdraw", data)];
                case 8:
                    res = _c.sent();
                    utils_2["default"].checkAndThrow(res, "Withdrawing balance");
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.withdrawBalance = withdrawBalance;

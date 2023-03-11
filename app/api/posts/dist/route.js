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
exports.GET = void 0;
var server_1 = require("next/server");
var getArticles_1 = require("@/components/getArticles");
function GET(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var queryParams, query, articles, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.warn("<handler GET>");
                    console.log("<handler> - Method: ", req.method);
                    console.log("<handler> - Headers: ", req.mode);
                    console.log("<Continued>");
                    if (!(req.method === "GET")) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    queryParams = new URLSearchParams(req.url);
                    query = queryParams.values().next().value;
                    return [4 /*yield*/, getArticles_1["default"](query)];
                case 2:
                    articles = _a.sent();
                    console.log(typeof res, "<- RESPONSE");
                    return [2 /*return*/, server_1.NextResponse.json(articles)];
                case 3:
                    error_1 = _a.sent();
                    throw new Error(error_1);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.GET = GET;
// import cors from 'cors';
//
// const Cors = cors({
//   methods: ['GET', 'HEAD'],
//   origin: '*',
//   optionsSuccessStatus: 200,
//   allowedHeaders: ['Content-Type', 'Authorization'],
// });
// 
// async function corsMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
//   console.log("<CORS> - Middleware Fired -")
//   console.log("<CORS> - Header", req.headers)
//   return new Promise<void>((resolve, reject) => {
//     console.log("<CORS> - New Promise Fired -")
//     if (req.method === 'OPTIONS') {
//       console.log("<CORS> - Options Request -")
//       return resolve();
//     }
//     fn(req, res, (err: any) => {
//     // ^ This Line is the Problem
//       if (err) {
//         console.log("<CORS> Rejected Cors: ", err)
//         return reject(err)
//       }
//       console.log("<CORS> Resolved Cors")
//       return resolve()
//     });
//   });
// }

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @FileDescription:
 * @Author: 李永创
 * @Date: 2021-01-06 21:01:26
 * @LastEditors: 李永创
 * @LastEditTime: 2021-09-13 15:05:54
 */
var tools_1 = __importDefault(require("@lyctianya/tools"));
var gulp = require("gulp");
var tinypng = require("gulp-tinypng-nokey");
var inputDir, outDir;
var args = process.argv.splice(2);
if (!args || !args[0] || !args[1]) {
    inputDir = tools_1.default.readUserInput("请输入图片文件夹地址:");
    outDir = tools_1.default.readUserInput("请输入输出文件夹(默认替换原文件):");
}
else {
    inputDir = args[0];
    outDir = args[1];
}
if (outDir == "" || outDir == undefined) {
    outDir = inputDir;
}
inputDir = inputDir.replace(/\\/g, "/");
outDir = outDir.replace(/\\/g, "/");
function tinypng_img(imgUrl) {
    imgUrl = imgUrl.replace(/\\/g, "/");
    console.log("imgUrl", imgUrl);
    console.log("输出", tools_1.default.getParent(imgUrl.replace(inputDir, outDir)));
    gulp.src(imgUrl)
        .pipe(tinypng())
        .pipe(gulp.dest(tools_1.default.getParent(imgUrl.replace(inputDir, outDir))));
}
var fileList = tools_1.default.getDirAllFiles(inputDir);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, item, tmp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < fileList.length)) return [3 /*break*/, 4];
                item = fileList[i];
                tmp = item.path.toLocaleLowerCase();
                if (!((item.isFile && tmp.endsWith(".png")) || tmp.endsWith(".jpg"))) return [3 /*break*/, 3];
                return [4 /*yield*/, tinypng_img(item.path)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); })();

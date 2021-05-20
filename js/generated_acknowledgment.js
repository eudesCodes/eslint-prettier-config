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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
/* eslint-disable no-undef */
var path_1 = require("path");
var fs = require("fs");
var p_map_1 = require("p-map");
var license_comment_1 = require("./license_comment");
/**
 * @constant
 * @description :
 */
// @name  NODES_MODULE_PATH
var NODES_MODULE_PATH = path_1.join(process.cwd(), 'node_modules');
// @name  OUT_FILE_PATH
var OUT_FILE_PATH = path_1.join(process.cwd(), 'ACKNOWLEDGMENTS.md');
// @name  ROOT_PACKAGE_PATH
var ROOT_PACKAGE_PATH = path_1.join(process.cwd(), 'package.json');
// Read the dependencies property
var dependencies = require(ROOT_PACKAGE_PATH).dependencies;
/**
 * @function
 * @name getLicenseContents -
 * @param { string } name   name of dependencie
 * @return { Promise<string> }
 */
var getLicenseContents = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var licenseContents, DEPENCIE_PATH, verifIfLicenseFileExist, LicenseFile, LicenseFile_PATH, LicenseFile_PACKAGE_PATH, license, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                licenseContents = '';
                DEPENCIE_PATH = path_1.join(NODES_MODULE_PATH, name);
                verifIfLicenseFileExist = function (fileName) {
                    return /^licen[s|c]e/i.test(fileName);
                };
                return [4 /*yield*/, fs.promises.readdir(DEPENCIE_PATH)];
            case 1:
                LicenseFile = (_c.sent()).find(verifIfLicenseFileExist);
                if (!LicenseFile) return [3 /*break*/, 3];
                LicenseFile_PATH = path_1.join(DEPENCIE_PATH, LicenseFile);
                return [4 /*yield*/, fs.promises.readFile(LicenseFile_PATH, 'utf8')];
            case 2:
                // read license file
                licenseContents = (_c.sent()).trim();
                return [3 /*break*/, 5];
            case 3:
                LicenseFile_PACKAGE_PATH = path_1.join(DEPENCIE_PATH, 'package.json');
                _b = (_a = JSON).parse;
                return [4 /*yield*/, fs.promises.readFile(LicenseFile_PACKAGE_PATH, 'utf8')];
            case 4:
                license = _b.apply(_a, [_c.sent()]).license;
                if (license) {
                    licenseContents = "License: " + license;
                }
                _c.label = 5;
            case 5: return [2 /*return*/, __spreadArray(__spreadArray([
                    "## " + name,
                    ''
                ], licenseContents.split(/\r?\n/).map(function (line) {
                    return line.trim();
                })), [
                    '',
                ]).join('\n')];
        }
    });
}); };
// generated a content in  OUT_FILE_PATH
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _b = (_a = fs.promises).writeFile;
                _c = [OUT_FILE_PATH];
                _d = [license_comment_1.headerComments(OUT_FILE_PATH),
                    '',
                    '# Acknowledgments',
                    ''];
                return [4 /*yield*/, p_map_1["default"](__spreadArray([], Object.keys(dependencies)).sort(), getLicenseContents)];
            case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.concat([
                        (_e.sent()).join('\n')
                    ]).join('\n')]))];
            case 2:
                _e.sent();
                return [2 /*return*/];
        }
    });
}); })();

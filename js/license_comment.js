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
exports.headerComments = void 0;
/*
 Copyright (c) 2020 - 2021 https://eudes.codes/
 @author: Eudes Evrard BOBBOH - EBO
 @country: France
 @email: evrard@eudes.codes
 @website: https://eudes.codes/
THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ /* eslint-disable no-undef */
var path_1 = require("path");
var fs = require("fs");
var p_map_1 = require("p-map");
/**
 * @function
 * @name headerComments
 * @description:
 */
var headerComments = function (Path) {
    // @constant  name dateOfCreation
    var dateOfCreation = 2020;
    // @constant  name currentDate
    var currentDate = new Date().getFullYear();
    var COPYRIGHT = " Copyright (c) " + dateOfCreation + " - " + currentDate + " https://eudes.codes/";
    var AUTHOR = ' @author: Eudes Evrard BOBBOH - EBO';
    var COUNTRY = ' @country: France';
    var E_MAIL = ' @email: evrard@eudes.codes';
    var WEBSITE = ' @website: https://eudes.codes/';
    var LICENSE = "THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.";
    // extensions
    var EXTENSIONS_TO_CHECK = new Set(['html', 'txt', 'md']);
    var FILE_EXTENSIONS = Path.split('.').pop();
    if (FILE_EXTENSIONS && !EXTENSIONS_TO_CHECK.has(FILE_EXTENSIONS))
        return ['/*', COPYRIGHT, AUTHOR, COUNTRY, E_MAIL, WEBSITE, LICENSE, '*/'].join('\n');
    // @return
    return ['<!--', COPYRIGHT, AUTHOR, COUNTRY, E_MAIL, WEBSITE, LICENSE, '-->'].join('\n');
};
exports.headerComments = headerComments;
/**
 *
 * @param filePath
 */
var addHeaderComment = function (filePath) {
    fs.readFile(filePath, 'utf8', function (_error, result) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!result) return [3 /*break*/, 2];
                    //
                    return [4 /*yield*/, fs.promises.writeFile(filePath, headerComments(filePath) + result.split(headerComments(filePath)).join(''))];
                case 1:
                    //
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
};
// Read the dependencies property
var _a = require(path_1.join(process.cwd(), 'package.json')).files, files = _a === void 0 ? [] : _a;
//
(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, p_map_1["default"](files, addHeaderComment)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); })();

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.set = undefined;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = function () {
    var _arguments = Array.prototype.slice.call(arguments),
        name = _arguments[0],
        data = _arguments[1];

    if (!_lodash2.default.isString(name)) {
        return;
    }
    var filePath = _path2.default.join(setting.path, (0, _moment2.default)().format("YYYY-MM-DD"), name + ".log");
    return function (coding, parseData) {
        return data !== void 0 ? coding.call({ parseData: parseData }, data) : coding.bind({ parseData: parseData });
    }(function (data) {
        var parseData = this.parseData;

        data = parseData(data);
        if (!_fs2.default.existsSync(filePath)) {
            return (0, _outputFileSync2.default)(filePath, data, { encoding: "utf-8" });
        }
        _fs2.default.readFile(filePath, "utf-8", function (err, d) {
            if (!err) {
                data = [data, d].join("\r");
            }
            (0, _outputFileSync2.default)(filePath, data + "\r", { encoding: "utf-8" });
        });
    }, function (data) {
        var title = "[" + (0, _moment2.default)().format("YYYY-MM-DD") + "] ";
        if ((typeof data === "undefined" ? "undefined" : (0, _typeof3.default)(data)) !== "object") {
            return title + String(data);
        }
        return title + (0, _stringify2.default)(data, void 0, 4);
    });
};

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _outputFileSync = require("output-file-sync");

var _outputFileSync2 = _interopRequireDefault(_outputFileSync);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setting = {
    path: _path2.default.resolve("log")
};

var set = exports.set = function set(config) {
    return _lodash2.default.assign(setting, config || {});
};
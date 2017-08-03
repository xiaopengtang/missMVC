"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _lang = require("../../lang");

var _lang2 = _interopRequireDefault(_lang);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var namespace = {};

function $import(path) {
    var relative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var isFile = arguments[2];

    relative = _lodash2.default.isString(relative) ? relative : "";
    if (!_lodash2.default.isString(path)) {
        return null;
    }
    var $root = namespace[relative] || "";

    var file = _path2.default.join($root, path);

    var ret = null;
    try {
        ret = isFile === true ? $fs.readFileSync(file, "utf-8") : require(file);
    } catch (e) {
        // console.log(["this is err",file,relative,e])
        ret = null;
    }
    // console.log(["this is import",file,ret])
    return ret && ret.__esModule && ret.default || ret;
}

$import.addPath = function (alis, path) {
    if (alis in namespace) {
        return console.warn((0, _lang2.default)("core.import_addPth_exists"));
    }
    namespace[alis] = path;
};

$import.getStaticPath = function (name) {
    return namespace[name];
};

exports.default = $import;
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _lang = require("../../lang");

var _lang2 = _interopRequireDefault(_lang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var namespace = {};

function $import(path, relative, isFile) {
    relative = _.isString(relative) ? relative : "";
    if (!_.isString(path)) {
        return null;
    }
    var $root = namespace[relative];
    var file = _path2.default.join($root, path);
    var ret = null;
    try {
        ret = isFile === true ? $fs.readFileSync(file, "utf-8") : require(file);
    } catch (e) {
        ret = null;
    }
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
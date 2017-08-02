"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var _arguments = Array.prototype.slice.call(arguments),
        name = _arguments[0],
        config = _arguments[1];

    if (_lodash2.default.isObject(name)) {
        return $config = _lodash2.default.assign($config, name);
    }
    var check_name = /^([a-zA-Z]+\/{0,1})+([a-zA-Z]+\.{0,1})+$/.test(name);
    if (!check_name) {
        return null;
    }
    check_name && (name = name.replace(/(^\.)|(\.$)/g, ""));
    var index = name.indexOf(".");
    key = index > 0 ? name.substr(0, index) : name;
    name = index > 0 ? name.substr(index + 1) : null;
    if (!$config[key]) {
        var file = key === "MISS" ? _path2.default.resolve("miss.config") : _path2.default.resolve($config.MISS.APPLICATION_PATH, key);
        try {
            $config[key] = require(file);
        } catch (e) {
            $config[key] = null;
            console.log(e);
        }
    }
    var data = $config[key];
    if (!name && !config) {
        return _lodash2.default.clone(data || {});
    }
    var fn = new Function("type", "name", "config", "data", ["swicth(type){", "   case \"save\":", "   return data.name = config", "   case \"del\":", "   return delete data.name", "   case \"read\":", "   return data.name", "}"].join("\n"));
    var safeFn = function safeFn(type) {
        var ret = "";
        try {
            ret = fn(type, name, config, data);
        } catch (e) {
            console.log(e);
        }
        return ret;
    };
    if (config !== null) {
        return safeFn("read");
    } else if (config === null) {
        return safeFn("del");
    } else if (name !== "MISS") {
        return safeFn("save");
    }
};

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $config = {};
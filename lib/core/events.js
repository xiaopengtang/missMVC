"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.use = exports.extend = undefined;

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventEmitter = new _events2.default.EventEmitter();

exports.default = {
    extend: function extend(cb) {
        return eventEmitter.on("extend", cb);
    },
    use: function use(cb) {
        return eventEmitter.on("use", cb);
    }
};
var extend = exports.extend = function extend(app) {
    return eventEmitter.emit("extend", app);
};

var use = exports.use = function use(cb) {
    return eventEmitter.emit("use", cb);
};
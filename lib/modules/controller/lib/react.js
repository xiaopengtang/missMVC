"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (Vnode, store) {
    Vnode = (0, _react.cloneElement)(Vnode, { store: store });
    return _server2.default.renderToString(Vnode);
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = _callee;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require("serve-favicon");

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _ejs = require("ejs");

var _ejs2 = _interopRequireDefault(_ejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [_callee].map(_regenerator2.default.mark);

function _callee($app) {
    var app, config, VIEW_PATH;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    app = $app.app, config = $app.config;
                    VIEW_PATH = config("MISS.VIEW_PATH") || "";
                    // console.log(["this is ejs",ejs,ejs.__express])

                    app.set("views", VIEW_PATH);
                    app.use((0, _morgan2.default)('dev'));
                    app.use(_bodyParser2.default.json());
                    app.use(_bodyParser2.default.urlencoded({ extended: false }));
                    app.use((0, _cookieParser2.default)());
                    app.set('view engine', 'html');
                    app.engine('html', _ejs2.default.__express);
                    app.use(_express2.default.static(config("MISS.STATIC_PATH") || ""));
                    return _context.abrupt("return", _ejs2.default);

                case 11:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}
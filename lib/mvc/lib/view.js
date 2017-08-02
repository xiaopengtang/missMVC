"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function ($config, $app) {
    var app = $app.app,
        lang = $app.lang;

    _lodash2.default.forEach($app.router, function (config) {
        var $router = _express2.default.Router();
        config.middleware && config.middleware.forEach(function (middleware) {
            return $router.use(middleware);
        });
        var parse = config.ctrl;
        var err = function err(res, req, next) {
            var err = new Error(lang("mvc.not_allow_visit"));
            err.status = 405;
            next(err);
        };
        var route = $router.route(config.url);
        var isAll = _lodash2.default.without(config.method, "all").length > 0;
        if (isAll) {
            route.all(parse);
            return app.use($router);
        }
        ["get", "post", "delete", "put"].forEach(function (type) {
            var status = _lodash2.default.without(config.method, type).length > 0;
            route[type](status ? parse : err);
        });
        app.use($router);
    });
};

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
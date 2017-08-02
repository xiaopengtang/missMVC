"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var safeRequire = exports.safeRequire = function safeRequire(file) {
    var ret = null;
    try {
        ret = require(file);
    } catch (e) {
        console.log(e);
    }
    return ret;
};
var splitTheme = exports.splitTheme = function splitTheme(tpl, df) {
    var theme = df;
    if (/^.+@.+$/.test(tpl)) {
        var pos = tpl.search(/@/);
        var TPL = tpl;
        tpl = TPL.substr(0, pos);
        theme = TPL.substr(pos + 1);
    }
    theme && (tpl = [theme, tpl].join("/"));
    tpl = tpl.replace(/\/+/g, "/").replace(/^\//, "");
    tpl.__proto__.getTheme = function () {
        return theme;
    };
    return tpl;
};
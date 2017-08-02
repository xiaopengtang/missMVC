"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var pkg = {};

function lang(name) {
	var read = new Function("name", "pkg", "return pkg.name");
	var ret = "";
	try {
		ret = read(name, pkg);
	} catch (e) {}
	return ret;
}

lang.set = function (name) {
	pkg = require("./" + name) || {};
	pkg = pkg && pkg.__esModule ? pkg.default : pkg;
};

lang.set("zh");

exports.default = lang;
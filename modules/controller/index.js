"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var controller = function () {
    function controller() {
        _classCallCheck(this, controller);

        this.$engine = "default";
        this.$data = {};
    }

    _createClass(controller, [{
        key: "setServer",
        value: function setServer(obj) {
            //
        }
    }, {
        key: "assign",
        value: function assign(name, val) {
            if (_lodash2.default.isObject(name) && !val) {
                this.$data = _lodash2.default.assign(this.$data, name);
            } else if (_lodash2.default.isString(name) && val !== void 0) {
                this.$data[name] = val;
            }
        }
    }, {
        key: "display",
        value: function display(tpl, data, callback) {
            var template = miss.utils.splitTheme(tpl, this.$namespace);
            var templateFile = _path2.default.join(miss.config("app.view_theme") || "default", template);
            data && (this.$data = _lodash2.default.assign(this.$data, data));
            return this.$response.render(templateFile, this.$data, callback);
        }
    }]);

    return controller;
}();

exports.default = controller;
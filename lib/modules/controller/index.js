"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _vue = require("./lib/vue");

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = function () {
    function controller() {
        (0, _classCallCheck3.default)(this, controller);
        this.$engine = "default";
        this.$data = {};
    }

    (0, _createClass3.default)(controller, [{
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
            var templateFile = $path.join(miss.config("app.view_theme") || "default", template);
            data && (this.$data = _lodash2.default.assign(this.$data, data));
            return this.$response.render(templateFile, this.$data, callback);
        }
        // render(Vnode){
        //     if(this.$engine === "react"){
        //         this.$assign("_INSTALL_STATE",JSON.stringify(this.$store.getState()))
        //         return react(Vnode,this.$store)
        //     }else if(this.$engine === "vue"){
        //         this.$assign("_INSTALL_STATE",JSON.stringify(this.$store.state))
        //         return vue(Vnode,this.$store)
        //     }else{
        //         return Vnode
        //     }
        // }

    }]);
    return controller;
}();
// import $path from "path"
// import react from "./lib/react"


exports.default = controller;
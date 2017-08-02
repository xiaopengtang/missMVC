"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

exports.default = function () {
    var MISS = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (isInit) {
        return console.warn("application core has run");
    }
    (0, _keys2.default)(MISS).length > 0 && (0, _config2.default)({ MISS: MISS });
    _import2.default.addPath("", (0, _config2.default)("MISS.APPLICATION_PATH"));
    _import2.default.addPath("view", (0, _config2.default)("MISS.VIEW_PATH"));
    _lang2.default.set((0, _config2.default)("MISS.lang") || "zh");
    isInit = true;
    var app = (0, _express2.default)((0, _config2.default)("MISS.express") || {});
    (0, _events.extend)(app); //用户自定义app钩子
    (0, _logger.set)({ path: (0, _config2.default)("MISS.LOG_PATH") });
    var $app = { app: app, lang: _lang2.default, logger: _logger2.default, utils: utils, "import": _import2.default, config: _config2.default };
    return (0, _co2.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _router.router)($app);

                    case 2:
                        $app.router = _context.sent;

                        $app.type = "router";
                        (0, _events.use)($app);
                        _context.next = 7;
                        return (0, _layout2.default)($app);

                    case 7:
                        $app.layout = _context.sent;

                        $app.type = "layout";
                        (0, _events.use)($app);
                        (0, _mvc2.default)($app);
                        return _context.abrupt("return", (0, _run2.default)($app.app));

                    case 12:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};

var _logger = require("../logger");

var _logger2 = _interopRequireDefault(_logger);

var _utils = require("../utils");

var utils = _interopRequireWildcard(_utils);

var _router = require("../router");

var _mvc = require("../mvc");

var _mvc2 = _interopRequireDefault(_mvc);

var _layout = require("../layout");

var _layout2 = _interopRequireDefault(_layout);

var _run = require("../run");

var _run2 = _interopRequireDefault(_run);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _lang = require("../../lang");

var _lang2 = _interopRequireDefault(_lang);

var _import = require("./import");

var _import2 = _interopRequireDefault(_import);

var _events = require("./events");

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isInit = false;
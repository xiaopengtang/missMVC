"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = _callee;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _view = require("./lib/view");

var _view2 = _interopRequireDefault(_view);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _view3 = require("../router/lib/view");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [_callee].map(_regenerator2.default.mark);

function _callee($app) {
    var view, app, lang;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    view = $app.router.view;

                    (0, _view2.default)(view, $app);
                    app = $app.app, lang = $app.lang;
                    //404

                    app.use(function (req, res, next) {
                        var err = new Error('Not Found');
                        err.status = 404;
                        next(err);
                    });
                    //配置404以及错误页面
                    app.use(function ($err, req, res, next) {
                        var PAGE_ERROR = $app.config("MISS.PAGE_ERROR");
                        var errorFile = _path2.default.join("modules", PAGE_ERROR);
                        var errorCls = $app.import(errorFile);
                        if (!errorCls) {
                            var err = new Error(lang("mvc.not_find_err_ctrl"));
                            return next(err);
                        }
                        var errorObject = new errorCls();

                        errorObject.$server = function (sFile) {
                            sFile = sFile ? _path2.default.join("modules", sFile) : _path2.default.join("modules", path, "server");
                            var serverFile = $app.import(sFile);
                            if (!serverFile) {
                                return null;
                            }
                            var serverObject = new serverFile();
                            serverObject.$store = errorObject.$store;
                            return serverObject;
                        }(errorObject.$server);
                        _lodash2.default.isFunction(errorObject.created) && errorObject.created();
                        return (0, _view3.parse)()(req, res);
                    });
                    //语法报错 from controller
                    app.use(function (err, req, res, next) {
                        $app.logger("ctrl", { "message": err.message, stack: err.stack });
                        // console.log(err)
                        res.status(err.status || 500);
                        res.setHeader("Content-Type", "text/html");
                        res.end("this is a bad request");
                    });

                case 6:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}
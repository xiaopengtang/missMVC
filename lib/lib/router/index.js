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

var _view = require("./lib/view");

var _view2 = _interopRequireDefault(_view);

var _api = require("./lib/api");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [_callee].map(_regenerator2.default.mark);

function _callee($app) {
    var pageFile, pages, view, api;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    pageFile = _path2.default.resolve("pages.json");
                    pages = $app.utils.safeRequire(pageFile);

                    if (pages) {
                        _context.next = 4;
                        break;
                    }

                    throw new Error($app.lang("no_pages_json"));

                case 4:
                    view = (0, _view2.default)(pages.pages, $app);
                    api = (0, _api2.default)(pages.restful, $app);
                    // console.log(["this is pages",pages,view,api])

                    return _context.abrupt("return", { view: view, api: api });

                case 7:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}
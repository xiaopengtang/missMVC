"use strict";

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _core = require("./lib/core");

var _controller = require("./modules/controller");

var _controller2 = _interopRequireDefault(_controller);

var _middleware = require("./modules/middleware");

var _middleware2 = _interopRequireDefault(_middleware);

var _server = require("./modules/server");

var _server2 = _interopRequireDefault(_server);

var _utils = require("./lib/utils");

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var use = _core.events.use,
    extend = _core.events.extend;


var miss = _core.start;
miss.extend = extend;
miss.utils = utils;
miss.use = use;
miss.start = _core.start;
miss.config = _core.config;
miss.import = _core.$import;
miss.base = { controller: _controller2.default, middleware: _middleware2.default, server: _server2.default };

global.miss = miss;

module.exports = miss;
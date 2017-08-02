"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function ($app) {
    var app = $app.app,
        config = $app.config;

    var host = config("MISS.host");
    var $debug = require('debug')(host.name + ':server');
    var port = function (val) {
        var port = parseInt(val, 10);
        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    }(process.env.PORT || host.port || '3009');
    var server = _http2.default.createServer(app);
    app.set('port', port);
    server.listen(port);
    server.on('error', function (error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    });
    server.on('listening', function () {
        var addr = server.address();
        var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
        $debug('Listening on ' + bind);
    });
};

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
import $http from "http"

export default function($app){
    const {app,config} = $app
    const host = config("MISS.host")||{}
    const $debug  =  require('debug')(host.name+':server');
    let port      =  (function(val){
        let port = parseInt(val, 10);
        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    })(process.env.PORT || host.port || '3009');
    const server  =  $http.createServer(app);
    app.set('port', port);
    server.listen(port);
    server.on('error', error => {
        if (error.syscall !== 'listen') {
            throw error;
        }
        let bind = typeof port === 'string'
          ? 'Pipe ' + port
          : 'Port ' + port;
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
    server.on('listening', () => {
        let  addr = server.address();
        let  bind = typeof addr === 'string'
          ? 'pipe ' + addr
          : 'port ' + addr.port;
        $debug('Listening on ' + bind);
    });
}



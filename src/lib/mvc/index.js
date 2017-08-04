import _ from "lodash"
import $view from "./lib/view"
import $path from "path"
import {parse} from "../router/lib/view"

export default function* ($app){
    const {view} = $app.router
    $view(view,$app)
    const {app,lang} = $app
    //404
    app.use(function(req, res, next) {
        let err     =  new Error('Not Found');
        err.status  =  404;
        next(err);
    })
    //配置404以及错误页面
    app.use(function($err,req,res,next){
        const PAGE_ERROR = $app.config("MISS.PAGE_ERROR")
        const errorFile = $path.join("modules",PAGE_ERROR)
        const errorCls = $app.import(errorFile)

        if(!errorCls){
            const err = new Error(lang("mvc.not_find_err_ctrl"))
            return next(err)
        }
        const errorObject = new errorCls()
        // console.log(["this is errorCls",errorFile,errorCls,errorObject,errorObject.$rootTemplate])
        errorObject.$server = (function(sFile){
            sFile = sFile ? $path.join("modules",sFile) : $path.join("server",PAGE_ERROR)
            const serverFile = $app.import(sFile)
            if(!serverFile){
                return null
            }
            const serverObject = new serverFile()
            serverObject.$store = errorObject.$store
            return serverObject
        })(errorObject.$server)
        errorObject.$data.$error = $err
        _.isFunction(errorObject.created)&&errorObject.created()
        return parse(errorObject,$app)(req,res)

    })
    //语法报错 from controller
    app.use(function(err,req,res,next){
        $app.logger("ctrl",{"message":err.message,stack:err.stack})
        // console.log(err)
        res.status(err.status || 500);
        res.setHeader("Content-Type", "text/html")
        res.end("this is a bad request") ;
    })
}

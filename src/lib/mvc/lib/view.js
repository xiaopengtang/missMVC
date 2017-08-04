import _ from "lodash"
import express from "express"

export default function($config,$app){
    const {app,lang} = $app
    // console.log(["this is $app",$app.router])
    _.forEach($app.router.view , config => {
        config.method = config.method || []
        config.method.length > 0 && (config.method = config.method.map(a => a.toLowerCase()) )
        const $router = express.Router()
        config.middleware && config.middleware.forEach(middleware => $router.use(middleware))
        const parse = config.ctrl
        const err = function(res,req,next){
            const err = new Error(lang("mvc.not_allow_visit"))
            err.status = 405
            next(err)
        }
        const route = $router.route(config.url)
        // console.log(["this is config.method",config.method])
        const isAll = _.without(config.method||[],"all").length !== config.method.length
        // console.log(["this is config",config,isAll,_.without(config.method||[],"all")])
        if(isAll){
            route.all(parse)
            return app.use($router)
        }

        ["get","post","delete","put"].forEach(type => {
            const status = _.without(config.method,type).length !== config.method.length
            route[type](status ? parse : err)
        })
        app.use($router)
    })
}

import _ from "lodash"
import express from "express"

export default function($config,$app){
    const {app,lang} = $app
    _.forEach($app.router , config => {
        const $router = express.Router()
        config.middleware && config.middleware.forEach(middleware => $router.use(middleware))
        const parse = config.ctrl
        const err = function(res,req,next){
            const err = new Error(lang("mvc.not_allow_visit"))
            err.status = 405
            next(err)
        }
        const route = $router.route(config.url)
        const isAll = _.without(config.method,"all").length > 0
        if(isAll){
            route.all(parse)
            return app.use($router)
        }
        ["get","post","delete","put"].forEach(type => {
            const status = _.without(config.method,type).length > 0
            route[type](status ? parse : err)
        })
        app.use($router)
    })
}

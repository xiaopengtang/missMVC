import _ from "lodash"
import $path from "path"
import co from "co"
export const parse = ctrlObject => ($request,$response) => {
    ctrlObject = _.assign(ctrlObject,{$response,$request})
    _.isFunction(ctrlObject.beforeMount) && ctrlObject.beforeMount($request.params)
    co(ctrlObject.render)
    .then(html => {
        const LAYOUT = ctrlObject.layout
        const renderData = _.assign(ctrlObject.$data,{html,LAYOUT})
        this.$response.render(ctrlObject.$rootTemplate,renderData)
    })
    .catch(e => {
        throw new Error(e)
    })
}
/**
* @param $config : pages的pages配置项
* @param $app:use -> return app对象
* @return Array
* waite for parsing object
* {
    route:String,
    ctrl:Function,
    method:[String,String,...],
    middleware:[Function,Function,...]
* }
* 说明：以上 空值 = null
*/
export default function($config,$app){
    if( !$config ){
        return null
    }
    let ret = []
    _.forIn($config,(path,url) => {
        let router = {url}
        const ctrlFile = $path.join("modules",path)
        const ctrl = $app.import(ctrlFile)
        if(!_.isFunction(ctrl)){
            return
        }
        let ctrlObject = new ctrl()

        ctrlObject.$server = (function(sFile){
            sFile = sFile ? $path.join("server",sFile) : $path.join("server",path)
            const serverFile = $app.import(sFile)
            if(!serverFile){
                return null
            }
            const serverObject = new serverFile()
            serverObject.$store = ctrlObject.$store
            return serverObject
        })(ctrlObject.$server)

        _.isFunction(ctrlObject.created) && ctrlObject.created()
        const {$method,$middleware} = ctrlObject
        router.method = $method || $app.config("app.pages_allow_methods")
        router.method = _.isString(router.method)?[router.method]:router.method
        router.middleware = (function(mdl){
            mdl = _.isString(mdl) ? [mdl] : mdl
            if(!Array.isArray(mdl)){
                return null
            }
            let ret = []
            mdl.forEach(m => {
                const middlewareFile = $path.join("middleware",m)
                const middleware = $app.import(middlewareFile)
                if( !_.isFunction(middleware) ){
                    return
                }
                //warn
                middleware && ret.push(($request,$response,next)=>{
                    let middlewareObject = new middleware()
                    middlewareObject = _.assign(middleware,{$response,$request})
                    _.isFunction(middlewareObject.next)&&middlewareObject.next(next)
                    // && co(middlewareObject.next).then(status => status === true?next():null).catch(e => next())
                })
            })
            return ret.length === 0 ? null : ret
        })($middleware)

        router.ctrl = parse(ctrlObject)
        ret.push(router)
    })
    return ret
}

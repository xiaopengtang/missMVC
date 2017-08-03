import logger,{set} from "../logger"
import * as utils from "../utils"
import router from "../router"
import mvc from "../mvc"
import layout from "../layout"
import run from "../run"
import express from "express"
import config from "./config"
import lang from "../../lang"
import $import from "./import"
import {use,extend} from "./events"
import co from "co"

let isInit = false

export default function(MISS = {}){
    if(isInit){
        return console.warn("application core has run")
    }
    Object.keys(MISS).length > 0 && config({MISS})
    $import.addPath("",config("MISS.APPLICATION_PATH"))
    $import.addPath("view",config("MISS.VIEW_PATH"))
    lang.set(config("MISS.lang")||"zh")
    isInit = true
    const app = express(config("MISS.express")||{})
    extend(app) //用户自定义app钩子
    set({path:config("MISS.LOG_PATH")})
    const $app = {app,lang,logger,utils,"import":$import,config}
    return co(function* (){
        $app.router = yield router($app)
        $app.type = "router"
        use($app)
        $app.layout = yield layout($app)
        $app.type = "layout"
        use($app)
        const mvc_status = yield mvc($app)
        return run($app)
    }).catch(e => console.log(e))
}

import _ from "lodash"
import $path from "path"
import favicon from "serve-favicon"
import logger from "morgan"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import express from "express"
import ejs from "ejs"

export default function* ($app){
    const {app,config} = $app
    const VIEW_PATH = config("MISS.VIEW_PATH")||""
    // console.log(["this is ejs",ejs,ejs.__express])
    app.set("views",VIEW_PATH)
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.set('view engine', 'html')
    app.engine('html', ejs.__express)
    app.use(express.static(config("MISS.STATIC_PATH")||"") )
    return ejs
}

import $path from "path"
import {events,start,config,$import} from "./lib/core"
import controller from "./modules/controller"
import middleware from "./modules/middleware"
import server from "./modules/server"
import * as utils from "./lib/utils"

const {use,extend} = events

const miss = start
miss.extend = extend
miss.utils = utils
miss.use = use
miss.start  = start
miss.config = config
miss.import = $import
miss.base = {controller,middleware,server}

global.miss = miss

export default miss

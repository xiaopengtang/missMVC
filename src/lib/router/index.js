import _ from "lodash"
import $path from "path"
import view from "./lib/view"
import api from "./lib/api"

export default function* ($app){
    const pageFile = $path.resolve("pages.json")
    const pages = $app.utils.safeRequire(pageFile)
    if(pages){
        throw new Error($app.lang("no_pages_json"))
    }
    const view = view(pages.pages,$app)
    const api = api(pages.restful,$app)
    return {view,api}
}

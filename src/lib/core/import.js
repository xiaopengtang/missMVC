import $path from "path"
import lang from "../../lang"
import _ from "lodash"
let namespace = {}

function $import(path,relative = "",isFile){
    relative    =  _.isString(relative) ? relative : ""
    if( !_.isString(path) ){
        return null ;
    }
    const $root  =  namespace[relative]||""

    let file     =  $path.join($root,path)

    let ret      =  null
    try{
        ret      =  isFile === true ? $fs.readFileSync(file,"utf-8") : require(file)
    }catch(e){
        ret      =  null
    }
    return ret && ret.__esModule && ret.default || ret
}

$import.addPath = function(alis,path){
    if( alis in namespace ){
        return console.warn(lang("core.import_addPth_exists"))
    }
    namespace[alis]   =  path ;
}

$import.getStaticPath = name => namespace[name]

export default $import

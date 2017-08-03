let $config = {}
import _ from "lodash"
import path from "path"

export default function(){
    let [name,config] = arguments
    if(_.isObject(name)){
        return $config = _.assign($config,name)
    }
    const check_name = /^(\w+\/{0,1})+(\w+\.{0,1})+$/.test(name)
    // console.log(["this is visit config",name,check_name])
    if(!check_name){
        return null
    }
    check_name&&(name = name.replace(/(^\.)|(\.$)/g,""))
    const index = name.indexOf(".")
    const key = index > 0 ? name.substr(0,index) : name
    // console.log(["this is key",key,name])
    name = index > 0 ? name.substr(index+1) : null
    if(!$config[key]){
        const file = key === "MISS" ? path.resolve("miss.config") : path.resolve($config.MISS.APPLICATION_PATH,key)
        // console.log(["this is file",file])
        try{
            $config[key] = require(file)
        }catch(e){
            $config[key] = null
            console.log(e)
        }
    }
    let data = $config[key]

    if(!name&&!config){
        return _.clone(data||{})
    }

    const fn = new Function("type","config","data",[
        `let ret = null`
        ,`switch(type){`
        ,`   case "save":`
        ,`       ret= data.${name} = config`
        ,`   break;`
        ,`   case "del":`
        ,`        ret= delete data.${name}`
        ,`   break;`
        ,`   case "read":`
        ,`        ret = data.${name}`
        ,`   break;`
        ,`}`
        ,`return ret`
    ].join("\n"))
    const safeFn = type => {
        let ret = ""
        try{
            ret = fn(type,config,data)
        }catch(e){
            console.log(e)
        }
        return ret
    }
    if(config!==null){
        // console.log(["this is read",data,name])
        return safeFn("read")
    }else if(config===null){
        return safeFn("del")
    }else if(name!=="MISS"){
        return safeFn("save")
    }
}

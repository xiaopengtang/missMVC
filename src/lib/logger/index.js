import _ from "lodash"
import moment from "moment"
import outputFileSync  from "output-file-sync"
import $path from "path"
import $fs from "fs"

let setting = {
    path : $path.resolve("log")
}

export const set = function(config){
    return _.assign(setting,config||{})
}

export default function(){
    const [name,data] = arguments
    if(!_.isString(name)){
        return
    }
    const filePath = $path.join(setting.path,moment().format("YYYY-MM-DD"),`${name}.log`)
    return (function(coding,parseData){
        return data !== void 0 ? coding.call({parseData},data) : coding.bind({parseData})
    })(function(data){
        const {parseData} = this
        data = parseData(data)
        if(!$fs.existsSync(filePath)){
            return outputFileSync(filePath,data,{encoding:"utf-8"})
        }
        $fs.readFile(filePath,"utf-8",(err,d)=>{
            if(!err){
                data = [data,d].join("\r")
            }
            outputFileSync(filePath,data+"\r",{encoding:"utf-8"})
        })
    },function(data){
        const title = `[${moment().format("YYYY-MM-DD")}] `
        if(typeof data !== "object"){
            return title+String(data)
        }
        return title + JSON.stringify(data,void 0 , 4)
    })
}



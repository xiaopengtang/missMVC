import _ from "lodash"
// import $path from "path"
// import react from "./lib/react"
import vue from "./lib/vue"
class controller{
    $engine = "default"
    $data = {}
    setServer(obj){
        //
    }
    assign(name,val){
        if(_.isObject(name)&&!val){
            this.$data = _.assign(this.$data,name)
        }else if(_.isString(name) && val !== void 0){
            this.$data[name] = val
        }
    }
    display(tpl,data,callback){
        const template = miss.utils.splitTheme(tpl,this.$namespace)
        const templateFile = $path.join(miss.config("app.view_theme")||"default",template)
        data && (this.$data = _.assign(this.$data,data))
        return this.$response.render(templateFile,this.$data,callback)
    }
    // render(Vnode){
    //     if(this.$engine === "react"){
    //         this.$assign("_INSTALL_STATE",JSON.stringify(this.$store.getState()))
    //         return react(Vnode,this.$store)
    //     }else if(this.$engine === "vue"){
    //         this.$assign("_INSTALL_STATE",JSON.stringify(this.$store.state))
    //         return vue(Vnode,this.$store)
    //     }else{
    //         return Vnode
    //     }
    // }
}

export default controller

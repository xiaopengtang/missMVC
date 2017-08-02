import _ from "lodash"
import $path from "path"
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
}

export default controller

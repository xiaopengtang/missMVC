export const safeRequire = function(file){
    let ret = null
    try{
        ret = require(file)
    }catch(e){
        console.log(e)
    }
    return ret
}
export const splitTheme = function(tpl,df){
    let theme = df
    if(/^.+@.+$/.test(tpl)){
        let pos      =  tpl.search(/@/) ;
        const TPL    =  tpl ;
        tpl          =  TPL.substr(0,pos)
        theme        =  TPL.substr(pos+1)
    }
    theme && ( tpl   =  [theme,tpl].join("/") );
    tpl              =  tpl.replace(/\/+/g,"/").replace(/^\//,"")
    tpl.__proto__.getTheme    =  () => theme ;
    return tpl ;
}

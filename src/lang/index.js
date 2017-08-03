let pkg = {}

function lang(name){
	const read = new Function("pkg",`return pkg.${name}`)
	let ret = ""
	try{
		ret = read(pkg)
	}catch(e){}
	return ret
}

lang.set = function(name){
	pkg = require(`./${name}`)||{}
	pkg = pkg && pkg.__esModule ? pkg.default : pkg
}

lang.set("zh")

export default lang

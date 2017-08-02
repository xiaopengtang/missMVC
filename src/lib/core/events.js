import events from "events"

const eventEmitter = new events.EventEmitter()

export default {
    extend(cb){
        return eventEmitter.on("extend",cb)
    },
    use(cb){
        return eventEmitter.on("use",cb)
    }
}

export const extend = function(app){
    return eventEmitter.emit("extend",app)
}

export const use = function(cb){
    return eventEmitter.emit("use",cb)
}

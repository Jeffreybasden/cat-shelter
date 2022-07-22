const http = require('http')
const handlers = require('./handlers')
const port = 4545

const server = http.createServer((req,res)=>{
    for(let handle of handlers){
        if(!handle(req,res)){
            break;
        }
    }
})

server.listen(port)
const fs = require('fs')
const path = require('path')
const url = require('url')
const cats = require('../data/cats.json')



module.exports=(req,res)=>{
    const pathname = req.url
    if(pathname === '/' && req.method === 'GET'){
        let filepath = path.normalize(path.join(__dirname,'../views/home/index.html'))
       
        fs.readFile(filepath,(err, data)=>{
            if(err){
                res.writeHead(404, {'Content-Type':'Text/plain'})
                res.end('404: cannot read file')
                return
            }
            
            let modifiedData = cats.map(cat=>`
            <li>
            <img src=${path.join('../content/images',cat.image)} alt="${cat.breed}">
            <h3>${cat.name}</h3>
            <p><span>Breed: </span>${cat.breed}</p>
            <p><span>Description: </span>${cat.description}</p>
            <ul class="buttons">
                <li class="btn edit"><a href="/cats/edit-cat/${cat.id}">Change Info</a></li>
                <li class="btn delete"><a href="/cats/cat-find-new-home/${cat.id}">New Home</a></li>
            </ul>
        </li>
            `).join('')
           let newData = data.toString().replace('{{cats}}', modifiedData)
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(newData)
            res.end()
        })
    }else{
        return true
    }
}

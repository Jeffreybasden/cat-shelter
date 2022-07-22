const url = require('url')
const path = require('path')
const  fs = require('fs')
const formidable = require('formidable')
const cat = require('../data/cats.json')
const breeds = require('../data/breed.json')


module.exports=(req,res)=>{
   const pathname = url.parse(req.url).pathname
    if(pathname === '/cats/add-cat' && req.method === 'GET'){
        const filepath = path.normalize(path.join(__dirname,'../views/addCat.html'))
        const index = fs.createReadStream(filepath)
        index.on('data', data=>{
            
            let catBreedplaceholder = breeds.map(breed=>`<option value=${breed}>${breed}</option>`).join('\n')
            
            let modifiedData = data.toString().replace('{{catBreeds}}',catBreedplaceholder)
            res.write(modifiedData)
            res.end()
           
        })
    }else if(pathname === '/cats/add-cat' && req.method==='POST'){
     const form = new formidable.IncomingForm()
     form.parse(req,(err,fields,files)=>{
         if(err){
             console.log(err)
         }
        let filename
        if(files.upload.originalFilename){
            let oldFile = files.upload.filepath;
            let newfile = path.normalize(path.join(__dirname,'../content/images/'+files.upload.originalFilename))
            console.log(files)
            console.log(files.upload.originalFilename)
            console.log(oldFile)
            
            fs.rename(oldFile,newfile,()=>{
                console.log('File uploaded')
               
            })
            filename = files.upload.originalFilename
        }else{
            filename = 'no-image.png'
        }
        
        cat.push({id:cat.length+1,...fields, image:filename})
        let catsJson = JSON.stringify(cat)
        fs.writeFile('./data/cats.json',catsJson,(err)=>{
            console.log('dataBase Updated')
            res.writeHead(301,{location:'/'})
            res.end()
        })
    })
           
            

        
 
    
    }else if(pathname==='/cats/add-breed' && req.method==='GET'){
    const filepath = path.normalize(path.join(__dirname,'../views/addBreed.html'))
    const index = fs.createReadStream(filepath)
    index.on('data', data=>{res.write(data)})
    index.on('end', ()=>{res.end()})
    
}else if(pathname==='/cats/add-breed'&& req.method==='POST'){
    const form = new formidable.IncomingForm()
    form.parse(req,(err,fields,files)=>{
        if(err){
            throw err
        }
        breed.push(fields.breed)
        let breedsJson = JSON.stringify(breed)
        fs.writeFile('./data/breed.json',breedsJson,'utf-8',()=>{
            console.log('Breed added', breedsJson )
        })
        res.writeHead(301,{location:"/"})
        res.end()
    })

}else if(pathname.includes('/cats/edit-cat')&& req.method==='GET'){
    let filepath = path.normalize(path.join(__dirname,'../views/editCat.html'))
    let index = fs.createReadStream(filepath)
    index.on('data', data=>{
        
        let catdata = breeds.map(breed=> `<option value=${breed}>${breed}</option>`).join('\n')
        catId = pathname.split('/')[3]
        catObj = cat.find(c => c.id.toString() === catId)
        console.log(catId)
        console.log(catObj)
        let modifiedData = data.toString().replace('{{name}}',catObj.name)
        modifiedData = modifiedData.replace('{{description}}',catObj.description)
        modifiedData = modifiedData.replace('{{catBreeds}}',catdata)
        modifiedData = modifiedData.replace('{{id}}',catObj.id)

        console.log(modifiedData)
        res.write(modifiedData)
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end()
    })
}else if(pathname.includes('/cats/edit-cat') && req.method==='POST'){

}else if(pathname.includes('/cats/cat-find-new-home') && req.method==='GET'){

}else if(pathname.includes('/cats/cat-find-new-home') && req.method === 'POST'){

}else return true
 
   


}


let fs= require("fs");
let path = require("path");
let myfolder = fs.readdirSync("/Users/akshitasingh/Downloads");
console.log(myfolder.length);
function filereader(i){
    if( i ==  myfolder.length){
        return ;
    }
   // console.log(path.join("Users/akshitasingh/Downloads/",myfolder[i]));
    let filePath =path.join("/Users/akshitasingh/Downloads/",myfolder[i]);
    fs.readFile( filePath, function( err,content){
       let fileExt = myfolder[i].split('.').pop();
       let fileName= myfolder[i];
        organisation ( filePath,fileName,fileExt);  
    })
    filereader(i+1);
}
filereader(0);
 function checkWetherDirPre(dirPath){
     return fs.existsSync(dirPath);
 }
 function createDirectory(dirPath){
     return fs.mkdirSync(dirPath);
}
 function organisation( filePath,fileName ,fileExt){
   let dirPath =path.join("/Users/akshitasingh/Downloads/",fileExt);
    let newPath = `/Users/akshitasingh/Downloads/${fileExt}/${fileName}`;
                                        
    let isdirPresent =checkWetherDirPre( dirPath);
     if( isdirPresent == false){
         createDirectory(dirPath);
         }
    else{
        
   //  let reqFile = `/Users/akshitasingh/Downloads/${fileExt}/${fileName}`;

      //let stringfile =JSON.stringify(enteries);
        fs.rename(filePath,newPath,function (){
            console.log(filePath);
        });
    }
 }

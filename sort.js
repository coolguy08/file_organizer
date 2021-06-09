const {extensions}=require("./extensions");

const fs=require("fs");
const path=require("path");
const readline=require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

let pathname="";
console.log("Welcome");
readline.question('Please Enter Folder Path Which You want to Sort? ', name => {
    pathname=name
    pathname=path.join(__dirname,pathname);
    if(!fs.existsSync(pathname)){
        console.log("Invalid Path!");
        readline.close();
        return;
    }
    readline.question('Please Confirm (Note:the Process is Irreversible) (y/n) ',ans=>{
        if(ans=='y' || ans=='yes' || ans=='Y')
        {

            console.log(pathname);
            sortDir(pathname)
            console.log("bye");
        }
        
        readline.close();
    })
    
  });




const FileTypes=Object.keys(extensions);

function sortDir(pathname){


    const files=fs.readdirSync(pathname);

    for(let i=0;i<files.length;i++){
        
        let fullpath=pathname+"/"+files[i];
        if(fs.lstatSync(fullpath).isDirectory()){
            
            sortDir(fullpath);
            if(!FileTypes.includes(files[i])){//removing dir if it is unspecified
                fs.rmdirSync(fullpath);
            }
            
        }
        else
        {
            sortfile(files[i],fullpath);
        }
        
    }

}

//sortDir(pathname);

function getparentdir(fullpath){
    let path=fullpath.split('/');
    path.pop();//gives filename
    return path.pop();//gives directory in which the file is present
}

function sortfile(filename,fullpath){
    
    let ext=filename.split('.').pop();
    let foldername=getfoldername(ext);
    
    if(foldername==undefined){ //if the specified  file ext not matches skip that file
        return;
    }

    if(foldername==getparentdir(fullpath)){//this means the file is in correct folder no need to move it

    }
    else
    {   
        
        if(!fs.existsSync(pathname+"/"+foldername)){//if folder not exitst make new folder
            fs.mkdirSync(pathname+"/"+foldername);
        }
        
       //to copy a file use fs.copyFile(src,dest);
    
       //to delete a file use fs.unlink(filepath)
    
        fs.renameSync(fullpath,pathname+"/"+foldername+'/'+filename);

    }
    

    
}


function getfoldername(ext){

    const FileTypes=Object.keys(extensions);
    
    for(let i=0;i<FileTypes.length;i++){
        let exts=extensions[FileTypes[i]]//get extensions of filetype
        if(exts.includes(ext)){
            return FileTypes[i];
        }
    }
}





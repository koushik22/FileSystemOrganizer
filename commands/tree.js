let fs = require("fs");
let path = require("path"); 
function treeFn(dirPath) {
    if (dirPath == undefined) {
        treeFnHelper(process.cwd(),"");
        return;
    }
    else {
        let doesExist = fs.existsSync(dirPath);
        // let destPath;
        if (doesExist) {
            treeFnHelper(dirPath, "");
        }
        else {
            console.log("Input correct directory path");
            return;
        }
    }
}
function treeFnHelper(dirPath, indent) {
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile) {
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName);
    }
    else {
        let dirname = path.basename(dirPath);
        console.log(indent + "└──" + dirname);
        let childrens = fs.readdirSync(dirPath);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(dirPath, childrens[i]);
            treeFnHelper(childPath, indent + "\t");
        }
    }
}
module.exports={
    treeKey:treeFn
}
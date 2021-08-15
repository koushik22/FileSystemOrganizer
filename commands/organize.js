function organizeFn(dirPath) {
    let destPath;
    if (dirPath == undefined) {
        destPath=process.cwd();
        return;
    }
    else {
        let doesExist = fs.existsSync(dirPath);
        // let destPath;
        if (doesExist) {
            destPath=path.join(dirPath,"organized_files");
            organizeFnHelper(dirPath, destPath);
        }
        else {
            console.log("Input correct directory path");
            return;
        }
    }
}

function organizeFnHelper(src, dest) {
    let childNames = fs.readdirSync(src);
    for (i = 0; i < childNames.length; i++) {
        childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            let category = getCategory(childNames[i]);
            sendFiles(childAddress, dest, category);
        }
    }
}
function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1)
    // console.log(ext);
    for (let type in types) {
        let ctypeArray = types[type];
        for (let i = 0; i < ctypeArray.length; i++) {
            if (ext == ctypeArray[i]) {
                return type;
            }
        }
    }
    return "others";
}

function sendFiles(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }

    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.linkSync(srcFilePath);
    console.log(fileName, "copied to -->", category);

}

module.exports={
    organizeKey:organizeFn
}
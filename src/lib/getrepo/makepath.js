/*
makepath.js will create a github link to the file in the repo using the path provided.

root\history\test.txt -> github.com/devscafecommunity/dev-docs/blob/master/history/test.txt
*/ 

function makePath(owner, repo, path) {
    let pathParts = path.split("\\");
    let pathString = "";
    let pathArray = [];
    pathParts.forEach((part) => {
        pathArray.push(part);
    });
    pathArray.forEach((part) => {
        pathString += part + "/";
    });
    pathString = pathString.slice(0, -1);
    // Base url: https://github.com/devscafecommunity/dev-docs/tree/main/root/...
    let baseUrl = `https://github.com/devscafecommunity/dev-docs/tree/main/root/`;
    let fullPath = baseUrl + pathString;
    return fullPath;
}

module.exports = makePath;
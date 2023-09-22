const { fetchAllPaths } = require('./getrepo');
const fetchFileInfo = require('./fetchfileinfo');

async function getall(owner, repo, githubToken) {
    let files = await fetchAllPaths(owner, repo, githubToken);
    let fileInfos = [];
    let pathPromises = [];
    files.forEach((file) => {
        pathPromises.push(fetchFileInfo(owner, repo, file, githubToken));
    });

    let pathResults = await Promise.all(pathPromises);
    pathResults.forEach((pathResult) => {
        fileInfos.push(pathResult);
    });

    return fileInfos;
}

module.exports = getall;
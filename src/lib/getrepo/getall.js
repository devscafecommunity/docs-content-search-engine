const { fetchAllPaths } = require('./getrepo');
const fetchFileInfo = require('./fetchfileinfo');

async function getall(owner, repo, githubToken) {
    let paths = await fetchAllPaths(owner, repo, githubToken);
    let fileInfos = [];
    let pathPromises = [];
    paths.forEach((path) => {
        pathPromises.push(fetchFileInfo(owner, repo, path, githubToken));
    });
    let pathResults = await Promise.all(pathPromises);
    pathResults.forEach((pathResult) => {
        fileInfos.push(pathResult);
    });
    return fileInfos;
}

module.exports = getall;
const fetchFileInfo = require('./fetchfileinfo');
const { fetchPathsJson } = require('./getrepo');

async function search(owner, repo, filename, githubToken) {
    // let paths = await fetchPathsJson(owner, repo, filename, githubToken);
    let paths = await fetchPathsJson(owner, repo, filename, githubToken);
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

module.exports = search;
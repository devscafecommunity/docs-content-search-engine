const fetchFileInfo = require('./fetchfileinfo');
const { fetchPathsJson } = require('./getrepo');

// TODO: Fix this function
async function search(owner, repo, filename, githubToken) {
    // let paths = await fetchPathsJson(owner, repo, filename, githubToken);
    // let fileInfos = [];
    // let pathPromises = [];
    // paths.forEach((path) => {
    //     pathPromises.push(fetchFileInfo(owner, repo, path, githubToken));
    // });
    // let pathResults = await Promise.all(pathPromises);
    // pathResults.forEach((pathResult) => {
    //     fileInfos.push(pathResult);
    // });
    // return fileInfos;
    throw new Error('Not implemented');
}

module.exports = search;
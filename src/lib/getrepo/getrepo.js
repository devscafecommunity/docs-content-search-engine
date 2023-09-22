function decodeBase64(data) {
    let buff = Buffer.from(data, 'base64');
    return buff.toString('ascii');
}


async function fetchPathsJson(owner, repo, fileNameToFind, githubToken) {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/paths.json`;

    let response = await fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${githubToken}`
        }
    });

    let pathsJson = await response.json();
    let paths = JSON.parse(decodeBase64(pathsJson.content));
    let foundPaths = [];


    function findFile(paths) {
        paths.directories.forEach((directory) => {
            if (directory.content.files.length > 0) {
                directory.content.files.forEach((file) => {
                    function escapeRegExp(string) {
                        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
                    }

                    let escapedFileNameToFind = escapeRegExp(fileNameToFind);

                    let regex = new RegExp(`^${escapedFileNameToFind}`, 'i');

                    if (regex.test(file.name)) {
                        foundPaths.push(file);
                    }
                });
            }
            if (directory.content.directories.length > 0) {
                findFile(directory.content);
            }
        });
    }

    findFile(paths);

    let finalPaths = [];

    if (foundPaths.length > 0) {
        foundPaths.forEach((path) => {
            finalPaths.push(path);
        });
    }

    return finalPaths;
}

async function fetchAllPaths(owner, repo, githubToken){
    // This do the same thing as fetchPathsJson, but it fetches all the paths in the repo.
    // this is user for the search page. It make the search faster, and more user friendly.
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/paths.json`;

    let response = await fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${githubToken}`
        }
    });

    let pathsJson = await response.json();
    let paths = JSON.parse(decodeBase64(pathsJson.content));
    let foundPaths = [];


    function findFile(paths) {
        paths.directories.forEach((directory) => {
            if (directory.content.files.length > 0) {
                directory.content.files.forEach((file) => {
                    foundPaths.push(file);
                });
            }
            if (directory.content.directories.length > 0) {
                findFile(directory.content);
            }
        });
    }

    findFile(paths);

    let finalPaths = [];

    if (foundPaths.length > 0) {
        foundPaths.forEach((path) => {
            finalPaths.push(path);
        });
    }

    return finalPaths;
}

module.exports = { fetchPathsJson, fetchAllPaths }
/*
https://github.com/devscafecommunity/dev-docs/tree/main/root/history/test.txt

getfileinfo.js will fetch the github for file info and return the most util information about the file.

{
    "name": "test.txt",
    "path": "root/history/test.txt",
    "sha": "c7a1e5f3e4b0c3c7f9f2d6b5a7b0a2c3f1e0d7c4",
    "size": 0,
    "url": "https://api.github.com/repos/devscafecommunity/dev-docs/contents/root/history/test.txt?ref=main",
    "html_url": "https://github.com/devscafecommunity/dev-docs/tree/main/root/history/test.txt",
    "post_date": "2021-07-21T20:00:00Z",
    "last_modified": "2021-07-21T20:00:00Z",
    "download_url": null,
    "type": "file",
}

*/

function decodeBase64(data) {
    let buff = Buffer.from(data, 'base64');
    return buff.toString('ascii');
}

async function fetchFileInfo(owner, repo, file, githubToken) {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${file.path}`;

    let response = await fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${githubToken}`
        }
    });

    let fileInfo = await response.json();
    let decodedContent = decodeBase64(fileInfo.content);

    let fileInfoObject = {
        name: fileInfo.name,
        path: fileInfo.path,
        sha: fileInfo.sha,
        size: fileInfo.size,
        url: fileInfo.url,
        html_url: fileInfo.html_url,
        download_url: fileInfo.download_url,
        type: fileInfo.type,
        content: decodedContent,

        // Metadata
        last_modified: file.lastModified,
        emmiter: file.emmiter,
        revision: file.revision,
        description: file.description,
        tags: file.tags,
    }

    return fileInfoObject;
}


module.exports = fetchFileInfo;
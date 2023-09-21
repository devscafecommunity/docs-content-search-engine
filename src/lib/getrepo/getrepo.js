// const axios = require('axios');

// const githubToken = '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';
// const owner = 'devscafecommunity';
// const repo = 'docs-content-search-engine';
// const fileNameToSearch = 'README.md';

// // https://github.com/devscafecommunity/docs-content-search-engine
// // const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
// const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents?ref=master`;

// async function searchForFile() {
//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${githubToken}`,
//       },
//     });

//     const files = response.data;
//     const foundFile = files.find(file => file.name === fileNameToSearch);

//     if (foundFile) {
//       console.log(`File found at: ${foundFile.html_url}`);
//     } else {
//       console.log('File not found in the repository.');
//     }
//   } catch (error) {
//     console.error('Error searching for the file:', error);
//   }
// }

// searchForFile();


async function getRepo(owner, repo) {
    let url = `https://api.github.com/repos/${owner}/${repo}/contents?ref=master`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function getRepoFile(owner, repo, file) {
    let url = `https://api.github.com/repos/${owner}/${repo}/contents/${file}?ref=master`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

// console.log(getRepo('devscafecommunity', 'docs-content-search-engine'));

getRepoFile('devscafecommunity', 'docs-content-search-engine', 'README.md').then(data => {
    console.log(data);
});

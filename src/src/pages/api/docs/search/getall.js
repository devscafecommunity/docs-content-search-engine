const getall = require('../../../../../lib/getrepo/getall');

export default async function handler(req, res) {
    // Allow cors
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    let githubToken = process.env.GITHUB_TOKEN;
    let owner = process.env.GITHUB_OWNER;
    let repo = process.env.GITHUB_REPO;
    let results = await getall(owner, repo, githubToken);
    res.status(200).json(results);
}
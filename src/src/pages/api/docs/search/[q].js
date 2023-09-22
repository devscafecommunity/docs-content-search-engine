/*
api/docs/search/[q].js
*/ 

const search = require('./../../../../../lib/getrepo/search');

export default async function handler(req, res) {
    let query = req.query.q;
    let githubToken = process.env.GITHUB_TOKEN;
    let owner = process.env.GITHUB_OWNER;
    let repo = process.env.GITHUB_REPO;
    let results = await search(owner, repo, query, githubToken);
    res.status(200).json(results);

}
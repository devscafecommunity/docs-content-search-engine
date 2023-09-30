import getUserPfp from '../../../../../lib/github/getuserpfp';

export default async function handler(req, res) {
    const { username } = req.query;
    const pfp = await getUserPfp(username);
    const response = await fetch(pfp);
    const data = await response.blob();
    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(Buffer.from(await data.arrayBuffer()));
}
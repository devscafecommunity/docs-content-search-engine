import getJournal from "../../../../lib/getjournal/mapdata";

export default function handler(req, res) {
    const journal = getJournal();
    res.status(200).json( journal );
}
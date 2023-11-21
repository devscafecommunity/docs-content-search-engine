import rawcanvas from "../../../../../lib/blog/postpreview/rawcanvas";
// api/blog/postpreview/[post].js
// api/blog/postpreview/<post-slug>

/*
// https://devscafeblog.vercel.app/api/posts/getallposts

Response:
[
	{
		"title": "Clean Code com Princípios S.O.L.I.D",
		"author": "Pedro K. Jesus",
		"description": "Como escrever código mais limpo, aderindo aos princípios S.O.L.I.D e a filosofia do clean code.",
		"date": "23-09-2023",
		"image": "/postassets/conceitos-solid-e-cleancode.png",
		"cover": "/postassets/conceitos-solid-e-cleancode.png",
		"slug": "conceitos-solid-e-cleancode"
	}
]
*/ 

// export default async function handler(req, res) {
//     // const { post } = req.query; // post slug
//     // const posts = await fetch(process.env.BLOG_URL + '/api/posts/getallposts');
//     // const data = await posts.json();
//     // const postdata = data.find((postdata) => postdata.slug === post);
//     // console.log(postdata);
//     // const buffer = await rawcanvas(
//     //     postdata.title,
//     //     postdata.description,
//     //     // `https://blog.devscafe.pt${postdata.image}`,
//     //     `${process.env.BLOG_URL}${postdata.image}`,
//     //     postdata.author,
//     //     postdata.date
//     // );

//     // res.setHeader('Content-Type', 'image/png');
//     // res.status(200).send(buffer);

//     // const { post } = req.query; // post slug
//     const posts = await fetch(process.env.BLOG_URL + '/api/posts/getallposts');

//     res.status(200).send(posts);
// }

export default async function handler(req, res) {
    const { post } = req.query; // post slug
    const posts = await fetch(process.env.BLOG_URL + '/api/posts/getallposts');
    const data = await posts.json();
    const postdata = data.find((postdata) => postdata.slug === post);
    const buffer = await rawcanvas(
        postdata.title,
        postdata.description,
        // `https://blog.devscafe.pt${postdata.image}`,
        `${process.env.BLOG_URL}${postdata.image}`,
        postdata.author,
        postdata.date
    );

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(buffer);
}
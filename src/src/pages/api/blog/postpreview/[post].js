import rawcanvas from "../../../../../lib/blog/postpreview/rawcanvas";
// api/blog/postpreview/[post].js
// api/blog/postpreview/<post-slug>

// Isto já não vai funcionar ja que o blog foi atualizado
// export default async function handler(req, res) {
//     const { post } = req.query; // post slug
//     const posts = await fetch(process.env.BLOG_URL + '/api/posts/getallposts');
//     const data = await posts.json();
//     const postdata = data.find((postdata) => postdata.slug === post);
//     const buffer = await rawcanvas(
//         postdata.title,
//         postdata.description,
//         // `https://blog.devscafe.pt${postdata.image}`,
//         `${process.env.BLOG_URL}${postdata.image}`,
//         postdata.author,
//         postdata.date
//     );

//     res.setHeader('Content-Type', 'image/png');
//     res.status(200).send(buffer);
// }

/*
Novos dados recebidos pelo mesmo endpoint: /api/blog/getallposts

:
[
  {
    "id": "18a73ffd-d257-4514-8d71-685797f969ca",
    "title": "Código legado é uma bola de neve e eu posso provar.",
    "tags": [
      "Boas Praticas",
      "Clean code",
      "Codigo legado",
      "Ambiente de trabalho"
    ],
    "description": "Codigo legado é como um tumor que vai te consumindo com o tempo.",
    "cover": "https://i.imgur.com/NRNoqdk.png",
    "createdDate": "2024-08-16T20:40:00.000Z",
    "lastEdited": "2024-08-16T21:10:00.000Z",
    "url": "/posts/codigo-legado-e-uma-bola-de-neve",
    "public": true,
    "slug": {
      "content": "codigo-legado-e-uma-bola-de-neve",
      "link": null
    }
  },
  {
    "id": "80fcbc66-99de-4ba5-845f-d1884a50c563",
    "title": "Clean Code com Princípios S.O.L.I.D",
    "tags": [
      "S.O.L.I.D",
      "Clean code",
      "Boas Praticas"
    ],
    "description": "Quando se trata de escrever código de qualidade, existem várias diretrizes e princípios que podem nos ajudar a alcançar esse objetivo. ",
    "cover": "https://i.imgur.com/3ToN0IJ.png",
    "createdDate": "2024-08-09T19:40:00.000Z",
    "lastEdited": "2024-08-16T20:12:00.000Z",
    "url": "/posts/conceitos-solid-cleancode",
    "public": true,
    "slug": {
      "content": "conceitos-solid-cleancode",
      "link": null
    }
  }
]

agora o dado que é buscado para imagem é post.cover
sem a necessidade de concatenar com o endereço do blog ja que as imagens vem com o endereço completo
podendo ser hospedadas em qualquer lugar sem a necessidade de serem hospedadas no blog
*/


export default async function handler(req, res) {
    const { post } = req.query; // post slug
    const posts = await fetch('https://blog.devscafe.pt/api/posts/getallposts');
    const data = await posts.json();

    const postdata = data.find((postdata) => postdata.slug === post);

    console.log(postdata);
    console.log("Antes")
    const buffer = await rawcanvas(
        postdata.title,
        postdata.description,
        postdata.cover,
        postdata.author,
        postdata.createdDate
    );
    console.log("Depois")

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(buffer);
}
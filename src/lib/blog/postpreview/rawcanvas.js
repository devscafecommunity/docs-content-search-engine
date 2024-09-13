const { createCanvas, loadImage } = require("@napi-rs/canvas");
import { coverimage } from "./coverimage";
// Raw canva image path: public/blogcontent/blog_preview_canvas.png | https://.../blogcontent/blog_preview_canvas.png
// 1920x1080

function supressTitile(input) {
  if (input.length > 33) return input.slice(0, 33) + "...";
  else return input;
}

function supressDescription(input) {
  if (input.length > 49) return input.slice(0, 49) + "...";
  else return input;
}

function supressAuthor(input) {
  if (input.length > 10) return input.slice(0, 12) + "...";
  else return input;
}
// 400x400 (1:1)
// image rounded 100% 
// just return the buffe of rounded image with no background (transparent)
// for bein used in blog preview raw canvas





export default async function rawcanvas(
  title,
  description,
  imageurl,
  author,
  date // date format: "dd/mm/yyyy" recived forat: 2024-08-16T21:10:00.000Z use Date() to format
) {
    // const width = 1920; 
    // const height = 1080;
    // new less size for fit in the blog previews : 400x400
    const width = 400;
    const height = 400;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    // Load image from path
    // const rawcanvas = await loadImage('').
    let base_image = await loadImage(process.env.SELF_URL + "/blogcontent/blog_preview_canvas.png");
    context.drawImage(base_image, 0, 0, width, height);

    // Date (Bottom left)
    context.font = "bold 12px Arial";
    context.fillStyle = "#5b352c";
    // context.fillText(date, 314, 81);
    context.fillText(new Date(date).toLocaleDateString(), 314, 81);

    // Author (Bottom left + px)
    context.font = "bold 12px Arial";
    context.fillStyle = "#5b352c";
    // context.fillText(author, 170, 81);
    context.fillText(supressAuthor(author), 170, 81);

    // Title (Center)
    context.font = "bold 13px Arial";
    context.fillStyle = "#5b352c";
    context.fillText(supressTitile(title), 70, 360);

    // Description (Center little bit down)
    context.font = "bold 10px Arial";
    context.fillStyle = "#5b352c";
    context.fillText(supressDescription(description), 70, 375);

    // Image (Center) from coverimage.js coverimage(url) return a buffer of the image
    let cibuffer = await coverimage(imageurl);
    let ci = await loadImage(cibuffer);
    context.drawImage(ci, 120, 115, 200, 200);

    return canvas.toBuffer("image/png");
}

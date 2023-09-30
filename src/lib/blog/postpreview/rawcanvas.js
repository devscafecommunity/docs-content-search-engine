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

// 400x400 (1:1)
// image rounded 100% 
// just return the buffe of rounded image with no background (transparent)
// for bein used in blog preview raw canvas





export default async function rawcanvas(
  title,
  description,
  imageurl,
  author,
  date
) {
    const width = 1920;
    const height = 1080;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    // Load image from path
    // const rawcanvas = await loadImage('').
    let base_image = await loadImage("https://cafe-content.vercel.app/blogcontent/blog_preview_canvas.png");
    context.drawImage(base_image, 0, 0, width, height);

    // Date (Bottom left)
    context.font = "bold 25px Arial";
    context.fillStyle = "#5b352c";
    context.fillText(date, 270, 875);

    // Author (Bottom left + px)
    context.font = "bold 25px Arial";
    context.fillStyle = "#5b352c";
    context.fillText(author, 560, 875);

    // Title (Center)
    context.font = "bold 50px Arial";
    context.fillStyle = "#5b352c";
    context.fillText(supressTitile(title), 400, 290);

    // Description (Center little bit down)
    context.font = "bold 40px Arial";
    context.fillStyle = "#5b352c";
    context.fillText(supressDescription(description), 400, 360);

    // Image (Center) from coverimage.js coverimage(url) return a buffer of the image
    let cibuffer = await coverimage(imageurl);
    let ci = await loadImage(cibuffer);
    context.drawImage(ci, 1130, 540, 400, 400);

    return canvas.toBuffer("image/png");
}

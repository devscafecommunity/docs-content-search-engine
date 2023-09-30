const { createCanvas, loadImage } = require("@napi-rs/canvas");

export async function coverimage(url) {
    const width = 400;
    const height = 400;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    let image = await loadImage(url);

    context.beginPath();
    context.arc(200, 200, 200, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    // Circle Shadow
    context.shadowColor = "rgba(0, 0, 0, 0.4)";
    context.shadowBlur = 10;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.drawImage(image, 0, 0, 400, 400);
    context.restore();
    // End Circle


    // Draw the image

    return canvas.toBuffer("image/png");
}

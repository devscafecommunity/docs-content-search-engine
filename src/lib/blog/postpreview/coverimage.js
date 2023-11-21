const { createCanvas, loadImage } = require("@napi-rs/canvas");

export async function coverimage(url) {
    const width = 200;
    const height = 200;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    let image = await loadImage(url);

    context.beginPath();
    // 200x200 (1:1)
    // image rounded 100%
    // just return the buffe of rounded image with no background (transparent)
    context.arc(100, 100, 100, 0, Math.PI * 2, true);

    context.closePath();
    context.clip();

    // Circle Shadow
    context.shadowColor = "rgba(0, 0, 0, 0.4)";
    context.shadowBlur = 10;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.drawImage(image, 0, 0, width, height);
    context.restore();

    return canvas.toBuffer("image/png");
}

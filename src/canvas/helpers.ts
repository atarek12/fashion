import Color from "color";

export type TBrushSettings = {
  color: string;
  size: number;
  transparency: number;
  softness: number;
};

export type TEraserSettings = {
  size: number;
};

export type TSize = { width: number; height: number };
export function getCanvasSize(fabricImg: fabric.Image, maxSize: TSize): TSize {
  return {
    width: Math.min(fabricImg.width || 0, maxSize.width),
    height: Math.min(fabricImg.height || 0, maxSize.height),
  };
}

export function getImageSize(
  fabricImg: fabric.Image,
  canvasSize: TSize,
): TSize {
  if (!fabricImg.width || !fabricImg.height) return canvasSize;

  const aspectRatio = fabricImg.width / fabricImg.height;
  let newWidth = canvasSize.width;
  let newHeight = canvasSize.height;

  if (fabricImg.width > fabricImg.height) {
    newHeight = canvasSize.width / aspectRatio;
    if (newHeight > canvasSize.height) {
      newHeight = canvasSize.height;
      newWidth = canvasSize.height * aspectRatio;
    }

    return { width: newWidth, height: newHeight };
  }

  newWidth = canvasSize.height * aspectRatio;
  if (newWidth > canvasSize.width) {
    newWidth = canvasSize.width;
    newHeight = canvasSize.width / aspectRatio;
  }

  return { width: newWidth, height: newHeight };
}

export function getColorSoftness(color: string): number {
  return Math.round(Color(color).saturationl());
}

export function updateColor(
  color: string,
  transparency = 255,
  softness = 0,
): string {
  const opacity = transparency / 255;
  return Color(color).alpha(opacity).saturationl(softness).hexa();
}

export function getImageData(canvas: fabric.Canvas): ImageData {
  const context = canvas.getContext();
  return context.getImageData(0, 0, canvas.width || 0, canvas.height || 0);
}

export function convertToBlackAndWhite(imageData: ImageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    const rgb = [red, green, blue];
    const blackWhite = Color(rgb).isLight() ? 255 : 0;
    data[i] = blackWhite;
    data[i + 1] = blackWhite;
    data[i + 2] = blackWhite;
    data[i + 3] = 255; // Remove transparency
  }
  return imageData;
}

export function cloneCanvas(
  canvas: fabric.Canvas,
  imageData: ImageData,
): HTMLCanvasElement {
  const htmlCanvas = document.createElement("canvas");
  htmlCanvas.width = canvas.width || 0;
  htmlCanvas.height = canvas.height || 0;
  const context = htmlCanvas.getContext("2d") as CanvasRenderingContext2D;
  context.putImageData(imageData, 0, 0);
  return htmlCanvas;
}

export function getCenterPoint(canvas: fabric.Canvas) {
  return {
    x: (canvas.width || 0) / 2,
    y: (canvas.height || 0) / 2,
  };
}

export function resetImageSettings(state: string, canvas?: fabric.Canvas) {
  const json = JSON.parse(state);
  const canvasWidth = canvas?.width || json.width || 0;
  const canvasHeight = canvas?.height || json.height || 0;
  const image = json.objects[0];
  image.selectable = false;
  image.left = (canvasWidth - image.width * image.scaleX) / 2;
  image.top = (canvasHeight - image.height * image.scaleY) / 2;
  return json;
}

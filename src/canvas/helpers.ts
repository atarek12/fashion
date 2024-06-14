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

import { fabric } from "fabric";
import { TSize, getCanvasSize, getImageSize } from "./helpers";

export const canvas = (function () {
  let canvas: fabric.Canvas | null = null;

  return {
    init: (id: string) => {
      if (canvas) return canvas;
      canvas = new fabric.Canvas(id);
      return canvas;
    },

    get: () => {
      return canvas;
    },

    clear: () => {
      if (canvas) {
        canvas.clear();
      }
    },

    dispose: () => {
      if (canvas) {
        canvas.dispose();
        canvas = null;
      }
    },

    loadImage: (file: File, maxSize: TSize) => {
      if (canvas) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target?.result as string;
          img.onload = () => {
            const fabricImg = new fabric.Image(img);
            const canvasSize = getCanvasSize(fabricImg, maxSize);
            const imageSize = getImageSize(fabricImg, canvasSize);
            fabricImg.scaleToWidth(imageSize.width);
            fabricImg.scaleToHeight(imageSize.height);
            canvas?.setWidth(canvasSize.width);
            canvas?.setHeight(canvasSize.height);
            canvas?.add(fabricImg);
            canvas?.centerObject(fabricImg);
            fabricImg.setCoords();
            canvas?.renderAll();
          };
        };
        reader.readAsDataURL(file);
      }
    },
  };
})();

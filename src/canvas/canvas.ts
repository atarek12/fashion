import { fabric } from "fabric";
import {
  TBrushSettings,
  TSize,
  getCanvasSize,
  getImageSize,
  updateColor,
} from "./helpers";

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

    enableDraw: (data: TBrushSettings) => {
      if (canvas) {
        const color = updateColor(data.color, data.transparency, data.softness);
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = data.size;
        canvas.freeDrawingBrush.color = color;
      }
    },

    disableDraw: () => {
      if (canvas) {
        canvas.isDrawingMode = false;
      }
    },

    updateDraw: (data: Partial<TBrushSettings>) => {
      if (canvas) {
        const color =
          data.color &&
          updateColor(data.color, data.transparency, data.softness);
        data.size && (canvas.freeDrawingBrush.width = data.size);
        color && (canvas.freeDrawingBrush.color = color);
      }
    },
  };
})();

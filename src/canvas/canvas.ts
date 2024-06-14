import { fabric } from "fabric";
import {
  TBrushSettings,
  TEraserSettings,
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

    /**
     * Image Loading
     */

    loadImage: (file: File, maxSize: TSize) => {
      if (canvas) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target?.result as string;
          img.onload = () => {
            const fabricImg = new fabric.Image(img, { erasable: false });
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

    /**
     * Drawer Settings
     */

    enableDraw: () => {
      if (canvas) {
        canvas.isDrawingMode = true;
      }
    },

    disableDraw: () => {
      if (canvas) {
        canvas.isDrawingMode = false;
      }
    },

    enableBrush: (data: TBrushSettings) => {
      if (canvas) {
        const color = updateColor(data.color, data.transparency, data.softness);
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = data.size;
        canvas.freeDrawingBrush.color = color;
      }
    },

    /**
     * Eraser Settings
     */

    updateBrush: (data: Partial<TBrushSettings>) => {
      if (canvas) {
        const color =
          data.color &&
          updateColor(data.color, data.transparency, data.softness);
        data.size && (canvas.freeDrawingBrush.width = data.size);
        color && (canvas.freeDrawingBrush.color = color);
      }
    },

    enableEraser: (data: TEraserSettings) => {
      if (canvas) {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
        canvas.freeDrawingBrush.width = data.size;
      }
    },

    updateEraser: (data: Partial<TEraserSettings>) => {
      if (canvas) {
        data.size && (canvas.freeDrawingBrush.width = data.size);
      }
    },

    /**
     * Downloading
     */

    download: () => {
      if (canvas) {
        const dataURL = canvas.toDataURL({
          format: "png",
          multiplier: 2,
        });
        const a = document.createElement("a");
        a.href = dataURL;
        a.download = "mask.png";
        a.click();
      }
    },
  };
})();

import { fabric } from "fabric";
import {
  TBrushSettings,
  TEraserSettings,
  TSize,
  cloneCanvas,
  convertToBlackAndWhite,
  getCanvasSize,
  getCenterPoint,
  getImageData,
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

    toBlackAndWhite: () => {
      if (canvas) {
        const imageData = getImageData(canvas);
        const blackWhite = convertToBlackAndWhite(imageData);
        const cloned = cloneCanvas(canvas, blackWhite);
        return cloned;
      }
    },

    download: (input?: HTMLCanvasElement) => {
      if (canvas) {
        const link = document.createElement("a");
        link.download = "canvas.png";
        link.href = (input || canvas).toDataURL();
        link.click();
        input?.remove();
      }
    },

    /**
     * Zooming
     */

    zoomIn: () => {
      if (canvas) {
        const zoom = canvas.getZoom();
        let newZoom = zoom * 1.1;
        if (newZoom > 20) newZoom = 20;
        const center = getCenterPoint(canvas);
        canvas.zoomToPoint(center, newZoom);
      }
    },

    zoomOut: () => {
      if (canvas) {
        const zoom = canvas.getZoom();
        let newZoom = zoom / 1.1;
        if (newZoom < 0.01) newZoom = 0.01;
        const center = getCenterPoint(canvas);
        canvas.zoomToPoint(center, newZoom);
      }
    },

    zoomReset: () => {
      if (canvas) {
        const center = getCenterPoint(canvas);
        canvas.zoomToPoint(center, 1);
      }
    },

    wheelZoom: () => {
      if (canvas) {
        canvas.on("mouse:wheel", (opt) => {
          const delta = opt.e.deltaY;
          let zoom = canvas?.getZoom() || 1;
          zoom *= 0.999 ** delta;

          if (zoom > 20) zoom = 20;
          if (zoom < 0.01) zoom = 0.01;

          canvas?.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
          opt.e.preventDefault();
          opt.e.stopPropagation();
        });
      }
    },
  };
})();

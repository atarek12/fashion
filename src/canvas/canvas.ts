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
      if (!canvas) return;
      canvas.clear();
    },

    dispose: () => {
      if (!canvas) return;
      canvas.dispose();
      canvas = null;
    },

    /**
     * Image Loading
     */

    loadImage: (file: File, maxSize: TSize) => {
      if (!canvas) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const fabricImg = new fabric.Image(img, {
            erasable: false,
            selectable: false,
          });
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
    },

    /**
     * Drawer Settings
     */

    enableDraw: () => {
      if (!canvas) return;
      canvas.isDrawingMode = true;
    },

    disableDraw: () => {
      if (!canvas) return;
      canvas.isDrawingMode = false;
    },

    enableBrush: (data: TBrushSettings) => {
      if (!canvas) return;
      const color = updateColor(data.color, data.transparency, data.softness);
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.width = data.size;
      canvas.freeDrawingBrush.color = color;
    },

    /**
     * Eraser Settings
     */

    updateBrush: (data: Partial<TBrushSettings>) => {
      if (!canvas) return;
      const color =
        data.color && updateColor(data.color, data.transparency, data.softness);
      data.size && (canvas.freeDrawingBrush.width = data.size);
      color && (canvas.freeDrawingBrush.color = color);
    },

    enableEraser: (data: TEraserSettings) => {
      if (!canvas) return;
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
      canvas.freeDrawingBrush.width = data.size;
    },

    updateEraser: (data: Partial<TEraserSettings>) => {
      if (!canvas) return;
      data.size && (canvas.freeDrawingBrush.width = data.size);
    },

    /**
     * Downloading
     */

    toBlackAndWhite: () => {
      if (!canvas) return;
      const imageData = getImageData(canvas);
      const blackWhite = convertToBlackAndWhite(imageData);
      const cloned = cloneCanvas(canvas, blackWhite);
      return cloned;
    },

    download: (input?: HTMLCanvasElement) => {
      if (!canvas) return;
      const link = document.createElement("a");
      link.download = "canvas.png";
      link.href = (input || canvas).toDataURL();
      link.click();
      input?.remove();
    },

    /**
     * Zooming
     */

    zoomIn: () => {
      if (!canvas) return;
      const zoom = canvas.getZoom();
      let newZoom = zoom * 1.1;
      if (newZoom > 20) newZoom = 20;
      const center = getCenterPoint(canvas);
      canvas.zoomToPoint(center, newZoom);
    },

    zoomOut: () => {
      if (!canvas) return;
      const zoom = canvas.getZoom();
      let newZoom = zoom / 1.1;
      if (newZoom < 0.01) newZoom = 0.01;
      const center = getCenterPoint(canvas);
      canvas.zoomToPoint(center, newZoom);
    },

    zoomReset: () => {
      if (canvas) {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        canvas.setZoom(1);
      }
    },

    wheelZoom: () => {
      if (!canvas) return;
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
    },

    /**
     * Dragging
     */

    beforeDrag: (e: KeyboardEvent) => {
      if (!canvas) return;
      if (e.ctrlKey) {
        if (!canvas.wasCtrlPressed) {
          canvas.prevDrawingMode = !!canvas.isDrawingMode;
        }
        canvas.isDrawingMode = false;
        canvas.wasCtrlPressed = true;
      } else {
        if (canvas.wasCtrlPressed) {
          canvas.isDrawingMode = canvas.prevDrawingMode;
        }
        canvas.wasCtrlPressed = false;
      }
    },

    enableDrag: () => {
      if (!canvas) return;
      canvas.on("mouse:down", function (opt) {
        if (!canvas) return;
        const evt = opt.e;
        if (evt.ctrlKey === true) {
          canvas.isDragging = true;
          canvas.selection = false;
          canvas.lastPosX = evt.clientX;
          canvas.lastPosY = evt.clientY;
        }
      });
      canvas.on("mouse:move", function (opt) {
        if (!canvas) return;
        if (canvas.isDragging) {
          const e = opt.e;
          const vpt = canvas.viewportTransform!;
          vpt[4] += e.clientX - canvas.lastPosX;
          vpt[5] += e.clientY - canvas.lastPosY;
          canvas.requestRenderAll();
          canvas.lastPosX = e.clientX;
          canvas.lastPosY = e.clientY;
        }
      });
      canvas.on("mouse:up", function () {
        if (!canvas) return;
        canvas.setViewportTransform(canvas.viewportTransform!);
        canvas.isDragging = false;
        canvas.selection = true;
      });
    },
  };
})();

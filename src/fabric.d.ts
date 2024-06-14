// Import the existing types from Fabric.js
import { fabric } from "fabric";

// Extend the fabric namespace to include the EraserBrush type
declare module "fabric" {
  namespace fabric {
    class EraserBrush extends fabric.PencilBrush {
      constructor(canvas: fabric.Canvas);
    }

    interface IObjectOptions {
      erasable?: boolean;
    }
  }
}

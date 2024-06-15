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

    interface Canvas {
      /** whether the control was pressed before to control drawing mode */
      wasCtrlPressed: boolean;
      /** save the previously drawing mode before disabling it so we can restore its state */
      prevDrawingMode: boolean;
      /** save is dragging whenever dragging starts */
      isDragging: boolean;
      /** save is lastPosX whenever dragging starts so we can calculate mouse position*/
      lastPosX: number;
      /** save is lastPosY whenever dragging starts so we can calculate mouse position */
      lastPosY: number;
      /** contains snapshots after all of the brush and the eraser actions  */
      history: string[];
      /** pointer to the current index of the history */
      historyIndex: number;
      /** whether we are doing undo/redo to prevent recording it */
      historyProcessing: boolean;
    }
  }
}

import React, { useEffect, useRef } from "react";
import { canvas } from "../../canvas";
import { TSize } from "../../canvas/helpers";
import { useCanvasContext } from "../../context";
import { canvasId } from "../../canvas/constant";

interface ImageLoaderProps {
  file: File;
  maxSize: TSize;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ file, maxSize }) => {
  const { setIsInitialized } = useCanvasContext();
  const isLoadedRef = useRef(false);
  useEffect(() => {
    canvas.init(canvasId);
    if (!isLoadedRef.current) {
      isLoadedRef.current = true;
      canvas.loadImage(file, maxSize);
      setIsInitialized(true);
    }
    return () => {
      canvas.dispose();
    };
  }, [file, maxSize, setIsInitialized]);

  return null;
};

export { ImageLoader };

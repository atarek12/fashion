import React, { useEffect, useRef } from "react";
import { canvas } from "../../canvas";
import { TSize } from "../../canvas/helpers";
import { useCanvasContext } from "../../context";

interface ImagePreviewProps {
  file: File;
  maxSize: TSize;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, maxSize }) => {
  const { setIsInitialized } = useCanvasContext();
  const isLoadedRef = useRef(false);
  useEffect(() => {
    canvas.init("canvas");
    if (!isLoadedRef.current) {
      isLoadedRef.current = true;
      canvas.loadImage(file, maxSize);
      setIsInitialized(true);
    }
    return () => {
      canvas.dispose();
    };
  }, [file, maxSize, setIsInitialized]);

  return <canvas id="canvas" />;
};

export { ImagePreview };

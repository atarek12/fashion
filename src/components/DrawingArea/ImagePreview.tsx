import React, { useEffect, useRef } from "react";
import { canvas } from "../../canvas";

interface ImagePreviewProps {
  file: File;
  maxSize: { width: number; height: number };
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, maxSize }) => {
  const isLoadedRef = useRef(false);
  useEffect(() => {
    canvas.init("canvas");
    if (!isLoadedRef.current) {
      isLoadedRef.current = true;
      canvas.loadImage(file, maxSize);
    }
    return () => {
      canvas.dispose();
    };
  }, [file, maxSize]);

  return <canvas id="canvas" />;
};

export { ImagePreview };

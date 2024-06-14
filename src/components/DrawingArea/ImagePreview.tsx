import React, { useEffect } from "react";
import { canvas } from "../../canvas";

interface ImagePreviewProps {
  file: File;
  maxSize: { width: number; height: number };
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, maxSize }) => {
  useEffect(() => {
    canvas.init("canvas");
    canvas.loadImage(file, maxSize);
    return () => {
      canvas.dispose();
    };
  }, [file, maxSize]);

  return <canvas id="canvas" />;
};

export { ImagePreview };

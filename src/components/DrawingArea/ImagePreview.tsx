import React, { useEffect, useRef } from "react";
import { canvas } from "../../canvas";
import { TSize } from "../../canvas/helpers";

interface ImagePreviewProps {
  file: File;
  maxSize: TSize;
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

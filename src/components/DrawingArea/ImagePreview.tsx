import { Image } from "@chakra-ui/react";
import React from "react";

interface ImagePreviewProps {
  file: File;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => {
  return <Image src={URL.createObjectURL(file)} />;
};

export { ImagePreview };

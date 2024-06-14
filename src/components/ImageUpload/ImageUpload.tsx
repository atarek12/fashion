import React from "react";
import { useDropzone } from "react-dropzone";
import { UploadContainer } from "./UploadContainer";
import { UploadPlaceholder } from "./UploadPlaceholder";
import DraggingPlaceholder from "./DraggingPlaceholder";

interface ImageUploadProps {
  onChange: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
    onDrop: (acceptedFiles) => onChange(acceptedFiles[0]),
  });

  return (
    <UploadContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <DraggingPlaceholder /> : <UploadPlaceholder />}
    </UploadContainer>
  );
};

export { ImageUpload };

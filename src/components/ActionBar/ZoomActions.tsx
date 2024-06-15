import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { MdZoomIn, MdZoomOut } from "react-icons/md";
import { TbZoomReset } from "react-icons/tb";
import { useCanvasContext } from "../../context";
import { canvas } from "../../canvas";

interface ZoomActionsProps {}

const ZoomActions: React.FC<ZoomActionsProps> = ({}) => {
  const { isInitialized } = useCanvasContext();

  const handleZoomIn = () => {
    canvas.zoomIn();
  };

  const handleZoomOut = () => {
    canvas.zoomOut();
  };

  const handleZoomReset = () => {
    canvas.zoomReset();
  };

  useEffect(() => {
    if (isInitialized) {
      canvas.wheelZoom();
      canvas.enableDrag();
      document.addEventListener("keydown", canvas.beforeDrag);
      document.addEventListener("keyup", canvas.beforeDrag);
      return () => {
        document.removeEventListener("keydown", canvas.beforeDrag);
        document.removeEventListener("keyup", canvas.beforeDrag);
      };
    }
  }, [isInitialized]);

  return (
    <ButtonGroup isAttached variant="outline" isDisabled={!isInitialized}>
      <IconButton
        title="Zoom In"
        aria-label="Zoom In"
        icon={<MdZoomIn size={24} />}
        onClick={handleZoomIn}
      />
      <IconButton
        title="Zoom Out"
        aria-label="Zoom Out"
        icon={<MdZoomOut size={24} />}
        onClick={handleZoomOut}
      />
      <IconButton
        title="Zoom Reset"
        aria-label="Zoom Reset"
        icon={<TbZoomReset size={20} />}
        onClick={handleZoomReset}
      />
    </ButtonGroup>
  );
};

export { ZoomActions };

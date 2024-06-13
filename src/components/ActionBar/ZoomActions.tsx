import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React from "react";
import { MdZoomIn, MdZoomOut } from "react-icons/md";
import { TbZoomReset } from "react-icons/tb";

interface ZoomActionsProps {}

const ZoomActions: React.FC<ZoomActionsProps> = ({}) => {
  return (
    <ButtonGroup isAttached variant="outline">
      <IconButton
        title="Zoom In"
        aria-label="Zoom In"
        icon={<MdZoomIn size={24} />}
      />
      <IconButton
        title="Zoom Out"
        aria-label="Zoom Out"
        icon={<MdZoomOut size={24} />}
      />
      <IconButton
        title="Zoom Reset"
        aria-label="Zoom Reset"
        icon={<TbZoomReset size={20} />}
      />
    </ButtonGroup>
  );
};

export { ZoomActions };

import { ButtonGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import { DrawButton } from "./DrawButton";
import { EraseButton } from "./EraseButton";
import { useCanvasContext } from "../../context";
import { canvas } from "../../canvas";

enum PaintActionsEnum {
  Draw = "Draw",
  Erase = "Erase",
}

interface PaintActionsProps {}

const PaintActions: React.FC<PaintActionsProps> = ({}) => {
  const { file } = useCanvasContext();
  const [open, setOpen] = useState<PaintActionsEnum>();

  const handleToggle = (drawer: PaintActionsEnum) => {
    const newOpen = open === drawer ? undefined : drawer;
    setOpen(newOpen);
    if (newOpen) canvas.enableDraw();
    else canvas.disableDraw();
  };

  return (
    <ButtonGroup isDisabled={!file}>
      <DrawButton
        isOpen={open === PaintActionsEnum.Draw}
        onToggle={() => handleToggle(PaintActionsEnum.Draw)}
        onClose={() => setOpen(undefined)}
      />
      <EraseButton
        isOpen={open === PaintActionsEnum.Erase}
        onToggle={() => handleToggle(PaintActionsEnum.Erase)}
        onClose={() => setOpen(undefined)}
      />
    </ButtonGroup>
  );
};

export { PaintActions };

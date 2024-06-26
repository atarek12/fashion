import { ButtonGroup } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DrawButton } from "./DrawButton";
import { EraseButton } from "./EraseButton";
import { useCanvasContext } from "../../context";
import { canvas } from "../../canvas";
import { RemoveButton } from "./RemoveButton";

enum PaintActionsEnum {
  Draw = "Draw",
  Erase = "Erase",
}

interface PaintActionsProps {}

const PaintActions: React.FC<PaintActionsProps> = ({}) => {
  const { isInitialized } = useCanvasContext();
  const [open, setOpen] = useState<PaintActionsEnum>();

  const handleToggle = (drawer: PaintActionsEnum) => {
    const newOpen = open === drawer ? undefined : drawer;
    setOpen(newOpen);
    if (newOpen) canvas.enableDraw();
    else canvas.disableDraw();
  };

  useEffect(() => {
    if (!isInitialized) {
      canvas.disableDraw();
      setOpen(undefined);
    }
  }, [isInitialized]);

  return (
    <ButtonGroup isDisabled={!isInitialized}>
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
      <RemoveButton />
    </ButtonGroup>
  );
};

export { PaintActions };

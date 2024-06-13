import { ButtonGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import { DrawButton } from "./DrawButton";
import { EraseButton } from "./EraseButton";

enum PaintActionsDrawer {
  Draw,
  Erase,
}

interface PaintActionsProps {}

const PaintActions: React.FC<PaintActionsProps> = ({}) => {
  const [open, setOpen] = useState<PaintActionsDrawer>();

  const handleToggle = (drawer: PaintActionsDrawer) => {
    setOpen(open === drawer ? undefined : drawer);
  };

  return (
    <ButtonGroup>
      <DrawButton
        isOpen={open === PaintActionsDrawer.Draw}
        onToggle={() => handleToggle(PaintActionsDrawer.Draw)}
        onClose={() => setOpen(undefined)}
      />
      <EraseButton
        isOpen={open === PaintActionsDrawer.Erase}
        onToggle={() => handleToggle(PaintActionsDrawer.Erase)}
        onClose={() => setOpen(undefined)}
      />
    </ButtonGroup>
  );
};

export { PaintActions };

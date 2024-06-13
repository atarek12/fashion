import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React from "react";
import { MdUndo, MdRedo } from "react-icons/md";

interface UndoActionsProps {}

const UndoActions: React.FC<UndoActionsProps> = ({}) => {
  return (
    <ButtonGroup isAttached variant="outline">
      <IconButton title="Undo" aria-label="Undo" icon={<MdUndo size={24} />} />
      <IconButton title="Redo" aria-label="Redo" icon={<MdRedo size={24} />} />
    </ButtonGroup>
  );
};

export { UndoActions };

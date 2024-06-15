import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { MdUndo, MdRedo } from "react-icons/md";
import { useCanvasContext } from "../../context";
import { canvas } from "../../canvas";

interface UndoActionsProps {}

const UndoActions: React.FC<UndoActionsProps> = ({}) => {
  const { isInitialized } = useCanvasContext();

  const handleUndo = () => {
    canvas.undo();
  };

  const handleRedo = () => {
    canvas.redo();
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "z") {
        handleUndo();
      }
      if (event.ctrlKey && event.key.toLowerCase() === "y") {
        handleRedo();
      }
    };
    if (!isInitialized) return;
    canvas.setupHistory();
    document.addEventListener("keyup", listener);
    return () => {
      document.removeEventListener("keyup", listener);
    };
  }, [isInitialized]);

  return (
    <ButtonGroup isAttached variant="outline" isDisabled={!isInitialized}>
      <IconButton
        title="Undo"
        aria-label="Undo"
        icon={<MdUndo size={24} />}
        onClick={handleUndo}
      />
      <IconButton
        title="Redo"
        aria-label="Redo"
        icon={<MdRedo size={24} />}
        onClick={handleRedo}
      />
    </ButtonGroup>
  );
};

export { UndoActions };

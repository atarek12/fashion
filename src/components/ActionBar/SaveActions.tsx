import { Button, ButtonGroup } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { MdDownload, MdSave, MdClear } from "react-icons/md";
import { canvas } from "../../canvas";
import { useCanvasContext } from "../../context";
import { canvasId } from "../../canvas/constant";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface SaveActionsProps {}

const SaveActions: React.FC<SaveActionsProps> = ({}) => {
  const { isInitialized, setFile, setIsInitialized } = useCanvasContext();
  const [saving, setSaving] = useState(false);

  const handleReset = () => {
    canvas.dispose();
    setFile(null);
    setIsInitialized(false);
  };

  const handleDownload = () => {
    const blackAndWhite = canvas.toBlackAndWhite();
    canvas.download(blackAndWhite);
  };

  const handleSave = useCallback(async () => {
    setSaving(true);
    const data = canvas.saveJson();
    localStorage.setItem(canvasId, data || "");
    await wait(1000);
    setSaving(false);
  }, []);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        handleSave();
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [handleSave]);

  return (
    <ButtonGroup isDisabled={!isInitialized}>
      <Button
        variant="outline"
        colorScheme="red"
        leftIcon={<MdClear size={24} />}
        onClick={handleReset}
      >
        Reset
      </Button>
      <Button
        colorScheme="teal"
        leftIcon={<MdSave size={24} />}
        loadingText="Saving..."
        isLoading={saving}
        onClick={handleSave}
      >
        Save
      </Button>
      <Button
        colorScheme="cyan"
        leftIcon={<MdDownload size={24} />}
        onClick={handleDownload}
      >
        Download
      </Button>
    </ButtonGroup>
  );
};

export { SaveActions };

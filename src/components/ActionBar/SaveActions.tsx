import { Button, ButtonGroup } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { MdDownload, MdSave, MdClear } from "react-icons/md";
import { canvas } from "../../canvas";
import { useCanvasContext } from "../../context";

interface SaveActionsProps {}

const SaveActions: React.FC<SaveActionsProps> = ({}) => {
  const { isInitialized, setFile, setIsInitialized } = useCanvasContext();
  const handleClear = () => {
    canvas.dispose();
    setFile(null);
    setIsInitialized(false);
  };

  const handleDownload = () => {
    const blackAndWhite = canvas.toBlackAndWhite();
    canvas.download(blackAndWhite);
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.ctrlKey && e.key === "s") {
        handleDownload();
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <ButtonGroup isDisabled={!isInitialized}>
      <Button
        variant="outline"
        colorScheme="red"
        leftIcon={<MdClear size={24} />}
        onClick={handleClear}
      >
        Clear
      </Button>
      <Button colorScheme="teal" leftIcon={<MdSave size={24} />}>
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

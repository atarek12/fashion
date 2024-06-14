import { Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import { MdDownload, MdSave, MdClear } from "react-icons/md";
import { canvas } from "../../canvas";
import { useCanvasContext } from "../../context";

interface SaveActionsProps {}

const SaveActions: React.FC<SaveActionsProps> = ({}) => {
  const { file, setFile } = useCanvasContext();
  const handleClear = () => {
    canvas.dispose();
    setFile(null);
  };

  return (
    <ButtonGroup isDisabled={!file}>
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
      <Button colorScheme="cyan" leftIcon={<MdDownload size={24} />}>
        Download
      </Button>
    </ButtonGroup>
  );
};

export { SaveActions };

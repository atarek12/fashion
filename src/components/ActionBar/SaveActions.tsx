import { Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import { MdDownload, MdSave, MdClear } from "react-icons/md";

interface SaveActionsProps {}

const SaveActions: React.FC<SaveActionsProps> = ({}) => {
  return (
    <ButtonGroup>
      <Button
        variant="outline"
        colorScheme="red"
        leftIcon={<MdClear size={24} />}
      >
        Clear
      </Button>
      <Button colorScheme="teal" leftIcon={<MdSave size={24} />}>
        Save
      </Button>
      <Button colorScheme="cyan" leftIcon={<MdDownload size={24} />}>
        Downlowd
      </Button>
    </ButtonGroup>
  );
};

export { SaveActions };

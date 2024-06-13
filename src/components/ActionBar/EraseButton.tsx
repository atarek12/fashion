import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { CgErase } from "react-icons/cg";
import { Drawer } from "./Drawer";
import { Slider } from "./Slider";

interface EraseButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const EraseButton: React.FC<EraseButtonProps> = ({
  isOpen,
  onToggle,
  onClose,
}) => {
  return (
    <div>
      <Button
        variant="outline"
        colorScheme="orange"
        leftIcon={<CgErase size={24} />}
        onClick={onToggle}
      >
        Erase
      </Button>

      <Drawer isOpen={isOpen} onClose={onClose}>
        <Flex gap={10}>
          <Stack>
            <Text>Size</Text>
            <Slider />
          </Stack>
          <Stack>
            <Text>Softness</Text>
            <Slider />
          </Stack>
          <Stack>
            <Text>Transparency</Text>
            <Slider />
          </Stack>
        </Flex>
      </Drawer>
    </div>
  );
};

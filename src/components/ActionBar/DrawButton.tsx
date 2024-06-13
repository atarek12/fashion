import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { MdBrush } from "react-icons/md";
import { Drawer } from "./Drawer";
import { Slider } from "./Slider";

interface DrawButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const DrawButton: React.FC<DrawButtonProps> = ({
  isOpen,
  onToggle,
  onClose,
}) => {
  return (
    <div>
      <Button
        variant="outline"
        colorScheme="purple"
        leftIcon={<MdBrush size={24} />}
        onClick={onToggle}
      >
        Draw
      </Button>

      <Drawer isOpen={isOpen} onClose={onClose}>
        <Flex gap={10}>
          <Flex align="center" gap="10px">
            <Text>Color</Text>
            <Input
              w="50px"
              padding="0"
              outline="none"
              borderRadius="0"
              type="color"
            />
          </Flex>
          <Stack>
            <Text>Size</Text>
            <Slider />
          </Stack>
        </Flex>
      </Drawer>
    </div>
  );
};

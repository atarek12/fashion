import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { CgErase } from "react-icons/cg";
import { Drawer } from "./Drawer";
import { Slider } from "./Slider";
import { TEraserSettings } from "../../canvas/helpers";
import { canvas } from "../../canvas";

const DefaultValues: TEraserSettings = {
  size: 20,
};

interface EraseButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

type TChangeEvent = {
  name: string;
  value: string | number;
};

export const EraseButton: React.FC<EraseButtonProps> = ({
  isOpen,
  onToggle,
  onClose,
}) => {
  const [values, setValues] = React.useState(DefaultValues);

  const onClick = () => {
    if (!isOpen) canvas.enableEraser(DefaultValues);
    onToggle();
  };

  const onChange = ({ name, value }: TChangeEvent) => {
    setValues((prev) => {
      const updatedValues = { ...prev, [name]: value };
      canvas.updateEraser(updatedValues);
      return updatedValues;
    });
  };

  return (
    <div>
      <Button
        variant="outline"
        colorScheme="orange"
        leftIcon={<CgErase size={24} />}
        onClick={onClick}
      >
        Erase
      </Button>

      <Drawer isOpen={isOpen} onClose={onClose}>
        <Flex gap={10}>
          <Stack>
            <Text>Size</Text>
            <Slider
              min={1}
              max={50}
              defaultValue={values.size}
              onChangeEnd={(value) => onChange({ name: "size", value })}
            />
          </Stack>
        </Flex>
      </Drawer>
    </div>
  );
};

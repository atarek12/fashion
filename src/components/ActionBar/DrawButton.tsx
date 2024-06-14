import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { MdBrush } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";
import { Drawer } from "./Drawer";
import { Slider } from "./Slider";
import { canvas } from "../../canvas";
import { TBrushSettings } from "../../canvas/helpers";

const DefaultValues: TBrushSettings = {
  color: "#ff0000",
  size: 20,
  softness: 100,
  transparency: 255,
};

type TChangeEvent = {
  name: string;
  value: string | number;
};

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
  const [values, setValues] = React.useState(DefaultValues);

  const onClick = () => {
    if (!isOpen) canvas.enableBrush(DefaultValues);
    onToggle();
  };

  const onChange = ({ name, value }: TChangeEvent) => {
    setValues((prev) => {
      const updatedValues = { ...prev, [name]: value };
      canvas.updateBrush(updatedValues);
      return updatedValues;
    });
  };
  const onChangeDebounce = useDebouncedCallback(onChange, 200);

  return (
    <div>
      <Button
        variant="outline"
        colorScheme="purple"
        leftIcon={<MdBrush size={24} />}
        onClick={onClick}
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
              value={values.color}
              onChange={(e) =>
                onChangeDebounce({ name: "color", value: e.target.value })
              }
            />
          </Flex>
          <Stack>
            <Text>Size</Text>
            <Slider
              min={1}
              max={50}
              defaultValue={values.size}
              onChangeEnd={(value) => onChange({ name: "size", value })}
            />
          </Stack>
          <Stack>
            <Text>Softness</Text>
            <Slider
              min={0}
              max={100}
              defaultValue={values.softness}
              onChangeEnd={(value) => onChange({ name: "softness", value })}
            />
          </Stack>
          <Stack>
            <Text>Transparency</Text>
            <Slider
              min={1}
              max={255}
              defaultValue={values.transparency}
              onChangeEnd={(value) => onChange({ name: "transparency", value })}
            />
          </Stack>
        </Flex>
      </Drawer>
    </div>
  );
};

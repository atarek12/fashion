import {
  Slider as ChakraSlider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import React from "react";

interface SliderProps {
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ onChange }) => {
  return (
    <ChakraSlider w={200} defaultValue={50} onChangeEnd={onChange}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </ChakraSlider>
  );
};

export { Slider };

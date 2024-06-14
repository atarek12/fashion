import {
  Slider as ChakraSlider,
  SliderProps as ChakraSliderProps,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import React from "react";

interface SliderProps extends ChakraSliderProps {}

const Slider: React.FC<SliderProps> = ({ ...rest }) => {
  return (
    <ChakraSlider w={200} {...rest}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </ChakraSlider>
  );
};

export { Slider };

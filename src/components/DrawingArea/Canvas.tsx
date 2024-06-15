import { Box } from "@chakra-ui/react";
import React from "react";
import { canvasId } from "../../canvas/constant";

interface CanvasProps {
  isInitialized: boolean;
}

const Canvas: React.FC<CanvasProps> = ({ isInitialized }) => {
  return (
    <Box
      border={isInitialized ? "1px dashed" : undefined}
      borderColor={isInitialized ? "brand.300" : undefined}
      width={isInitialized ? "auto" : "0"}
      height={isInitialized ? "auto" : "0"}
    >
      <canvas id={canvasId} />
    </Box>
  );
};

export { Canvas };

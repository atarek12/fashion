import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";
import React, { useRef } from "react";
import { ImageUpload } from "../ImageUpload";
import { ImageLoader } from "./ImageLoader";
import { useCanvasContext } from "../../context";
import { Canvas } from "./Canvas";

interface DrawingAreaProps {}

const DrawingArea: React.FC<DrawingAreaProps> = ({}) => {
  const { file, isInitialized, loading, setFile } = useCanvasContext();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperSize = useSize(wrapperRef);

  return (
    <Box as="section" h="calc(100vh - 200px)">
      <Container maxW="1200px" h="100%" mt="100px">
        <Flex ref={wrapperRef} justify="center" align="center" h="100%">
          {!loading && file && (
            <ImageLoader file={file} maxSize={wrapperSize!} />
          )}
          {!loading && !file && !isInitialized && (
            <ImageUpload onChange={setFile} />
          )}
          {loading && <Spinner size="xl" />}
          <Canvas isInitialized={isInitialized} />
        </Flex>
      </Container>
    </Box>
  );
};

export { DrawingArea };

import { Box, Container, Flex } from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";
import React, { useRef, useState } from "react";
import { ImageUpload } from "../ImageUpload";
import { ImagePreview } from "./ImagePreview";

interface DrawingAreaProps {}

const DrawingArea: React.FC<DrawingAreaProps> = ({}) => {
  const [file, setFile] = useState<File>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperSize = useSize(wrapperRef);

  return (
    <Box as="section" h="calc(100vh - 200px)">
      <Container maxW="1200px" h="100%" mt="80px">
        <Flex ref={wrapperRef} justify="center" align="center" h="100%">
          {file ? (
            <ImagePreview file={file} maxSize={wrapperSize!} />
          ) : (
            <ImageUpload onChange={setFile} />
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export { DrawingArea };

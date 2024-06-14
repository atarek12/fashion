import { Box, Container, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { ImageUpload } from "../ImageUpload";
import { ImagePreview } from "./ImagePreview";

interface DrawingAreaProps {}

const DrawingArea: React.FC<DrawingAreaProps> = ({}) => {
  const [file, setFile] = useState<File>();

  return (
    <Box as="section" h="calc(100vh - 200px)">
      <Container maxW="1200px" h="100%" mt="80px">
        <Flex justify="center" align="center" h="100%">
          {file ? (
            <ImagePreview file={file} />
          ) : (
            <ImageUpload onChange={setFile} />
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export { DrawingArea };

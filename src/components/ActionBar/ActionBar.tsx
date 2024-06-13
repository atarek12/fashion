import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import { ZoomActions } from "./ZoomActions";
import { SaveActions } from "./SaveActions";
import { PaintActions } from "./PaintActions";
import { UndoActions } from "./UndoActions";

interface ActionBarProps {}

const ActionBar: React.FC<ActionBarProps> = ({}) => {
  return (
    <Box pos="relative" as="header" p="4" bg="white" boxShadow="md">
      <Container maxW="1200px">
        <Flex align="center" justifyContent="space-between">
          <PaintActions />
          <Flex gap="4px">
            <ZoomActions />
            <UndoActions />
          </Flex>
          <SaveActions />
        </Flex>
      </Container>
    </Box>
  );
};

export { ActionBar };

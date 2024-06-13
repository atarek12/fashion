import { Box, Container, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { MdClose } from "react-icons/md";

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ children, isOpen, onClose }) => {
  return (
    <Box
      position="absolute"
      top="72px"
      left="0"
      right="0"
      zIndex="100"
      bg="white"
      width="100vw"
      boxShadow="md"
      overflow="hidden"
      maxH={isOpen ? "300px" : "0"}
      transition="200ms max-height ease-in"
    >
      <Container maxW="1200px" p="4">
        <Flex align="center" justify="space-between">
          {children}
          <IconButton
            title="Close"
            aria-label="Close"
            icon={<MdClose />}
            variant="ghost"
            onClick={onClose}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export { Drawer };

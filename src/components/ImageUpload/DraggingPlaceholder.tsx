import { Grid, Stack, Text } from "@chakra-ui/react";
import { MdDriveFolderUpload } from "react-icons/md";
import React from "react";

interface DraggingPlaceholderProps {}

const DraggingPlaceholder: React.FC<DraggingPlaceholderProps> = ({}) => {
  return (
    <Grid
      placeItems="center"
      position="absolute"
      inset="0"
      backgroundColor="gray.200"
      borderRadius="12px"
    >
      <Stack align="center" spacing="0">
        <MdDriveFolderUpload size={26} />
        <Text fontSize="30px" fontWeight="500" color="gray.600">
          Drop here
        </Text>
      </Stack>
    </Grid>
  );
};

export default DraggingPlaceholder;

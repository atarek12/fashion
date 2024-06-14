import { Stack, IconButton, Text } from "@chakra-ui/react";
import { MdDriveFolderUpload } from "react-icons/md";
import React from "react";

interface UploadPlaceholderProps {}

const UploadPlaceholder: React.FC<UploadPlaceholderProps> = ({}) => {
  return (
    <Stack spacing="12px" align="center">
      <IconButton
        variant="outline"
        colorScheme="gray"
        width="fit-content"
        padding="10px"
        aria-label="Upload file"
        title="Upload file"
        icon={<MdDriveFolderUpload size={26} />}
      />
      <Text color="gray.600">Click to upload or drag and drop</Text>
      <Text color="gray.600" fontSize="14px">
        PNG or JPG
      </Text>
    </Stack>
  );
};

export { UploadPlaceholder };

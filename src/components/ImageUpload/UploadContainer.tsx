import { Stack } from "@chakra-ui/react";
import React, { forwardRef } from "react";

interface UploadContainerProps {
  children: React.ReactNode;
}

const UploadContainer = forwardRef<HTMLDivElement, UploadContainerProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Stack
        ref={ref}
        position="relative"
        align="center"
        justify="center"
        direction="row"
        padding="16px 100px"
        border="1px dashed"
        borderColor="brand.300"
        borderRadius="12px"
        cursor="pointer"
        {...rest}
      >
        {children}
      </Stack>
    );
  },
);

export { UploadContainer };

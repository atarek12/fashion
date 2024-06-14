import { Box } from "@chakra-ui/react";
import { ActionBar, DrawingArea } from "./components";

function App() {
  return (
    <Box as="main" minH="100vh" bg="ButtonFace">
      <ActionBar />
      <DrawingArea />
    </Box>
  );
}

export default App;

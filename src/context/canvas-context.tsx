import { createContext, useContext, useState } from "react";

type TCanvasContext = {
  file: File | null;
  setFile: (file: File | null) => void;
  isInitialized: boolean;
  setIsInitialized: (isInitialized: boolean) => void;
};

const context = createContext<TCanvasContext>({
  file: null,
  setFile: (file: File | null) => {},
  isInitialized: false,
  setIsInitialized: (isInitialized: boolean) => {},
});

export const useCanvasContext = () => useContext(context);

interface CanvasProviderProps {
  children: React.ReactNode;
}

export const CanvasProvider = ({ children }: CanvasProviderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  return (
    <context.Provider
      value={{ file, setFile, isInitialized, setIsInitialized }}
    >
      {children}
    </context.Provider>
  );
};

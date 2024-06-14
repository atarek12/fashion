import { createContext, useContext, useState } from "react";

type TCanvasContext = {
  file: File | null;
  setFile: (file: File | null) => void;
};

const context = createContext<TCanvasContext>({
  file: null,
  setFile: (file: File | null) => {},
});

export const useCanvasContext = () => useContext(context);

interface CanvasProviderProps {
  children: React.ReactNode;
}

export const CanvasProvider = ({ children }: CanvasProviderProps) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <context.Provider value={{ file, setFile }}>{children}</context.Provider>
  );
};

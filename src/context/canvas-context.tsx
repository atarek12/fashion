import { createContext, useContext, useEffect, useState } from "react";
import { canvas } from "../canvas";
import { canvasId } from "../canvas/constant";

type TCanvasContext = {
  file: File | null;
  setFile: (file: File | null) => void;
  isInitialized: boolean;
  setIsInitialized: (isInitialized: boolean) => void;
  loading: boolean;
};

const context = createContext<TCanvasContext>({
  file: null,
  setFile: () => {},
  isInitialized: false,
  setIsInitialized: () => {},
  loading: true,
});

export const useCanvasContext = () => useContext(context);

interface CanvasProviderProps {
  children: React.ReactNode;
}

export const CanvasProvider = ({ children }: CanvasProviderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(canvasId);
    if (data) {
      canvas.init(canvasId);
      canvas.loadJson(data);
      setIsInitialized(true);
    }
    setLoading(false);
  }, []);

  return (
    <context.Provider
      value={{ file, setFile, isInitialized, setIsInitialized, loading }}
    >
      {children}
    </context.Provider>
  );
};

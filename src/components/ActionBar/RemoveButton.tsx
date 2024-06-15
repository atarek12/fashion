import React, { useEffect } from "react";
import { canvas } from "../../canvas";

interface RemoveButtonProps {}

const RemoveButton: React.FC<RemoveButtonProps> = () => {
  useEffect(() => {
    const handleRemove = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        canvas.removeActiveElement();
      }
    };

    document.addEventListener("keydown", handleRemove);

    return () => {
      document.removeEventListener("keydown", handleRemove);
    };
  }, []);

  return null;
};

export { RemoveButton };

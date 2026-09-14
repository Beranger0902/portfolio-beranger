"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import CvModal from "./CvModal";

const CvContext = createContext<{ openCv: () => void }>({ openCv: () => {} });

export const useCv = () => useContext(CvContext);

export default function CvProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openCv = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  return (
    <CvContext.Provider value={{ openCv }}>
      {children}
      <CvModal open={open} onClose={close} />
    </CvContext.Provider>
  );
}

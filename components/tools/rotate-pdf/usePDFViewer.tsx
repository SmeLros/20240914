"use client"

import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react"

interface PDFViewerContext {
  file: File | null
  rotates: number[]
  scale: number
  pageCount: number
  setRotates: Dispatch<SetStateAction<number[]>>
  setFile: Dispatch<SetStateAction<File | null>>
  setScale: Dispatch<SetStateAction<number>>
  setPageCount: React.Dispatch<React.SetStateAction<number>>
  reset: () => void
}

export const PDFViewerContext = createContext<PDFViewerContext | null>(null)

export function PDFViewerProvider({ children }: { children: React.ReactNode }) {
  const [file, setFile] = useState<PDFViewerContext["file"]>(null)
  const [rotates, setRotates] = useState<PDFViewerContext["rotates"]>([])
  const [scale, setScale] = useState<PDFViewerContext["scale"]>(1)
  const [pageCount, setPageCount] = useState(0)

  // 重置所有状态，包括文件、旋转角度、缩放比例和页数
  const reset = useCallback(() => {
    setFile(null)
    setRotates([])
    setScale(1)
    setPageCount(0)
  }, [])

  return (
    <PDFViewerContext.Provider
      value={{
        file,
        rotates,
        scale,
        pageCount,
        setFile,
        setRotates,
        setScale,
        setPageCount,
        reset,
      }}
    >
      {children}
    </PDFViewerContext.Provider>
  )
}

export const usePDFViewer = () => {
  const context = useContext(PDFViewerContext)
  if (!context) {
    throw new Error("usePDFViewer must be used within a PDFViewerProvider")
  }
  return context
}

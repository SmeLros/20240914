import { Loader2 } from "lucide-react"
import type { PDFDocumentProxy } from "pdfjs-dist"
import { Document } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"
import { PDFPage } from "./PDFPage"
import { usePDFViewer } from "./usePDFViewer"

export function PDFViewer() {
  const { file, pageCount, setPageCount, setRotates } = usePDFViewer()

  function documentLoadSuccessHandler({ numPages }: PDFDocumentProxy) {
    setPageCount(numPages)
    setRotates(Array.from(new Array(numPages), () => 0))
  }
  if (!file) return null
  return (
    <Document
      file={file}
      onLoadSuccess={documentLoadSuccessHandler}
      className="flex flex-row flex-wrap items-center justify-center gap-6"
      loading={
        <div className="flex w-full items-center justify-center">
          <Loader2 className="animate-spin" size={14} />
        </div>
      }
    >
      {Array.from(new Array(pageCount), (_, index) => (
        <PDFPage key={`${file.name}-page-${index + 1}`} index={index} />
      ))}
    </Document>
  )
}

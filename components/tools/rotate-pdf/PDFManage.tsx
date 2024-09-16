"use client"

import "@/lib/pdfjs-polyfill"

import { FileDragDropper } from "@/components/tools/rotate-pdf/FileDragDropper"
import UpLoad from "@/public/common/upload.svg"
import { pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"
import { PDFViewer } from "./PDFViewer"
import { usePDFViewer } from "./usePDFViewer"

const allowedFileTypes = ["application/pdf"]

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export function PDFManage() {
  const { file, setFile } = usePDFViewer()

  return (
    <div className="flex w-full justify-center">
      {!file && (
        <div className="h-[350px] w-[275px]">
          <FileDragDropper
            onChange={setFile}
            allowedFileTypes={allowedFileTypes}
          >
            <div className="flex cursor-pointer flex-col items-center gap-y-3">
              <UpLoad width={32} height={32} />
              <p className="pointer pointer-events-none text-sm font-medium leading-6 opacity-75">
                Click to upload or drag and drop
              </p>
            </div>
          </FileDragDropper>
        </div>
      )}
      <PDFViewer />
    </div>
  )
}

"use client"

import { PDFManage } from "@/components/tools/rotate-pdf/PDFManage"
import { usePDFViewer } from "@/components/tools/rotate-pdf/usePDFViewer"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"
import { PDFDocument, degrees } from "pdf-lib"

export default function Page() {
  const { file, rotates, setScale, setRotates, reset } = usePDFViewer()

  async function saveHandler() {
    if (!file) throw new Error("file is not defined")
    const arrayBuffer = await file.arrayBuffer()

    // 加载源文件
    const pdfDoc = await PDFDocument.load(arrayBuffer)

    // 根据页面中每一页的旋转角度调整页面旋转角度
    batchApplyRotation(pdfDoc, rotates)

    // 保存文件
    const pdfBytes = await pdfDoc.save()
    await saveUint8ArrayToPDF(pdfBytes, file.name)
  }

  return (
    <div className="bg-[#F7F5EE] text-black">
      <div className="mx-auto grid gap-5 py-20">
        <div className="!mb-5 grid grid-flow-row justify-center gap-[30px] text-center">
          <h1 className="font-serif text-5xl">Rotate PDF Pages</h1>
          <p className="max-w-lg text-gray-600">
            Simply click on a page to rotate it. You can then download your
            modified PDF.
          </p>
        </div>
        {file && (
          <div className="grid h-10 grid-flow-col justify-center gap-3">
            <Button
              className="h-full w-fit !bg-[#FF612F] px-3 py-2.5 !text-white"
              variant="ghost"
              onClick={() =>
                setRotates((prev) =>
                  [...prev].map((rotate) => (rotate ?? 0) + 90),
                )
              }
            >
              Rotate all
            </Button>
            <Button
              className="h-full w-fit !bg-[#1F2937] px-3 py-2.5 !text-white"
              variant="ghost"
              onClick={reset}
            >
              Remove PDF
            </Button>
            <Button
              className="w-fit rounded-full !bg-white p-2"
              variant="ghost"
              onClick={() => setScale((scale) => scale + 0.2)}
            >
              <span className="sr-only">zoom in</span>
              <ZoomIn className="size-5" />
            </Button>
            <Button
              className="w-fit rounded-full !bg-white p-2"
              variant="ghost"
              onClick={() => setScale((scale) => scale - 0.2)}
            >
              <span className="sr-only">zoom out</span>
              <ZoomOut className="size-5" />
            </Button>
          </div>
        )}
        <div className="flex w-full justify-center">
          <PDFManage />
        </div>
        {file && (
          <div className="flex w-full justify-center">
            <Button
              variant="ghost"
              className="h-full w-fit !bg-[#FF612F] px-3 py-2.5 !text-white"
              onClick={saveHandler}
            >
              Download
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 保存 Uint8Array 到 PDF 文件
 * @param uint8Array PDF文件的 Uint8Array格式数据
 * @param fileName 保存paf的文件名
 */
async function saveUint8ArrayToPDF(uint8Array: Uint8Array, fileName: string) {
  // 创建一个 Blob 对象
  const blob = new Blob([uint8Array], { type: "application/pdf" })

  // 创建一个临时的 URL
  const url = URL.createObjectURL(blob)

  // 创建一个 <a> 元素
  const link = document.createElement("a")
  link.href = url
  link.download = fileName // 设置下载的文件名

  // 触发下载
  document.body.appendChild(link)
  link.click()

  // 清理：移除 <a> 元素并释放 URL
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 *  根据页面中每一页的旋转角度调整页面旋转角度
 * @param pdfDoc PDFDocument 对象
 * @param rotations 每一页旋转角度，单位为度，数组数量需要和页码数量保持一致
 */
function batchApplyRotation(pdfDoc: PDFDocument, rotations: number[]) {
  // 根据页面中每一页的旋转角度调整页面旋转角度
  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const page = pdfDoc.getPage(i)
    const rotate = ((rotations[i] ?? 0 % 360) + 360) % 360
    page.setRotation(degrees(rotate))
  }
}

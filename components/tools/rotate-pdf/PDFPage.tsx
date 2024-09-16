"use client"

import Rotate from "@/public/common/rotate.svg"
import { useEffect, useRef } from "react"
import { Page } from "react-pdf"
import { usePDFViewer } from "./usePDFViewer"

export function PDFPage({ index }: { index: number }) {
  const { rotates, scale, setRotates } = usePDFViewer()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const rotate = rotates[index] ?? 0

  // 监听旋转角度变化，更新canvas的旋转角度
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.style.transform = `rotate(${rotate}deg)`
    canvas.style.width = `100%`
    canvas.style.objectFit = `contain`
    canvas.style.transition = `transform 150ms cubic-bezier(0.4, 0, 0.2, 1)`
  }, [rotate, index])

  return (
    <Page
      renderTextLayer={false}
      renderAnnotationLayer={false}
      pageNumber={index + 1}
      className="relative cursor-pointer overflow-hidden bg-white p-3 hover:!bg-gray-50"
      width={200}
      scale={scale}
      key={`page_${index + 1}`}
      onClick={() =>
        setRotates((prev) => {
          const newRotates = [...prev]
          newRotates[index] = (newRotates[index] ?? 0) + 90
          return newRotates
        })
      }
      canvasRef={canvasRef}
    >
      <div className="absolute right-1 top-1 z-10 rounded-full bg-[#ff612f] p-1 hover:scale-105">
        <Rotate width={12} height={12} className="fill-white" />
      </div>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs italic">
        {index + 1}
      </div>
    </Page>
  )
}

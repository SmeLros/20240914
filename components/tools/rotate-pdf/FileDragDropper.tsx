"use client"

import { cn } from "@/lib/utils"
import throttle from "lodash.throttle"
import { forwardRef, useCallback, useId, useMemo, useState } from "react"

export const FileDragDropper = forwardRef<
  HTMLLabelElement,
  {
    children: React.ReactNode
    className?: string
    /**
     * 默认 = undefined -> 允许所有类型文件
     * = [] -> 不允许任何类型文件
     */
    allowedFileTypes?: string[]
    onDrop?: (data: File) => void
    onDragEnter?: (data: File) => void
    onDragOver?: (data: File) => void
    onDragEnd?: (data: File) => void
    onChange?: (data: File | null) => void
  }
>(
  (
    {
      className,
      children,
      allowedFileTypes,
      onDrop = () => {},
      onDragEnter = () => {},
      onDragOver = () => {},
      onDragEnd = () => {},
      onChange = () => {},
    },
    ref,
  ) => {
    const [isDragOver, setIsDragOver] = useState<boolean>(false)
    const id = useId() + "-input-file"
    /**
     * 自动验证文件类型，并调用onChange事件
     * @param file 需要验证的文件, 如果为 undefined 则跳过验证（常用于清除前一次数据）
     */
    const fileValidAndChange = useCallback(
      (file: File | undefined) => {
        if (file && !validFileType(file, allowedFileTypes)) {
          console.warn(
            "File type not allowed, please select a file with a type: ",
            allowedFileTypes?.join(" or ") ?? "any type",
          )
          return
        }
        onChange?.(file ?? null)
      },
      [onChange, allowedFileTypes],
    )
    const throttledOnDragOver = useMemo(
      () =>
        throttle((file: File) => {
          onDragOver(file)
        }, 1000),
      [onDragOver],
    )
    const dragEnterHandler = useCallback(
      (e: React.DragEvent<HTMLLabelElement>) => {
        const file = disableDefaultBehaviorAndExtractFile(e)
        setIsDragOver(true)
        onDragEnter?.(file)
        fileValidAndChange(void 0)
      },
      [onDragEnter, fileValidAndChange],
    )
    const dragOverHandler = useCallback(
      (e: React.DragEvent<HTMLLabelElement>) => {
        const file = disableDefaultBehaviorAndExtractFile(e)
        throttledOnDragOver(file)
      },
      [throttledOnDragOver],
    )
    const dragEndHandler = useCallback(
      (e: React.DragEvent<HTMLLabelElement>) => {
        const file = disableDefaultBehaviorAndExtractFile(e)
        setIsDragOver(false)
        onDragEnd?.(file)
      },
      [onDragEnd],
    )
    const dropHandler = useCallback(
      (e: React.DragEvent<HTMLLabelElement>) => {
        const file = disableDefaultBehaviorAndExtractFile(e)
        setIsDragOver(false)
        onDrop?.(file)
        fileValidAndChange(file)
      },
      [onDrop, fileValidAndChange],
    )
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      fileValidAndChange(file)
    }

    return (
      <>
        <input
          className="hidden"
          type="file"
          id={id}
          accept={allowedFileTypes?.[0]}
          onChange={changeHandler}
        />
        <label
          ref={ref}
          htmlFor={id}
          className={cn(
            "flex h-full cursor-pointer items-center justify-center rounded border border-dashed border-stone-300 bg-white transition-all",
            className,
            isDragOver && "bg-muted",
          )}
          onDrop={dropHandler}
          onDragEnter={dragEnterHandler}
          onDragOver={dragOverHandler}
          onDragLeave={dragEndHandler}
        >
          {children}
        </label>
      </>
    )
  },
)

FileDragDropper.displayName = "FileDragDropper"

function disableDefaultBehaviorAndExtractFile(
  e: React.DragEvent<HTMLLabelElement>,
): File {
  e.preventDefault()
  e.stopPropagation()
  return e.dataTransfer.files[0]
}

/**
 * 检查文件类型是否合法
 * @param file   需要检查的文件
 * @param allowedFileTypes 默认 = undefined -> 允许所有类型文件；= [] -> 不允许任何类型文件
 * @returns true 表示符合要求, false 表示不符合要求
 */
function validFileType(
  file: File | undefined,
  allowedFileTypes: string[] | undefined,
) {
  if (!file || !file.type) return false
  if (allowedFileTypes) {
    if (!allowedFileTypes.map((v) => v.trim()).includes(file.type)) return false
  }
  return true
}

"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

import "react-quill/dist/quill.snow.css"

interface EditorProps {
  onChange: (value: string) => void
  value: string
}

const Editor = ({ onChange, value }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  )

  return (
    <div className="h-48">
      <ReactQuill
        className="flex flex-col h-full !rounded-lg"
        theme="snow"
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
export default Editor

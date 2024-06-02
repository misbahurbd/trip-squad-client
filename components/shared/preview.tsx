"use client"

import dynamic from "next/dynamic"
import { useEffect, useMemo, useState } from "react"

import "react-quill/dist/quill.bubble.css"

interface EditorProps {
  value: string
}

const Preview = ({ value }: EditorProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <ReactQuill
      theme="bubble"
      value={value}
      readOnly
    />
  )
}
export default Preview

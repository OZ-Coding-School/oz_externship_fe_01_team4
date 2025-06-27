import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  children: ReactNode
  targetId: string
}

const Portal = ({ children, targetId }: PortalProps) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.getElementById(`${targetId}`)
    setMounted(true)
  }, [targetId])

  if (mounted && ref.current) {
    return createPortal(children, ref.current)
  }

  return null
}

export default Portal

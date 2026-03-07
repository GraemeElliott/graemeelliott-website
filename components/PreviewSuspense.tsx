import { ReactNode, Suspense } from 'react'

interface PreviewSuspenseProps {
  children: ReactNode
  fallback: ReactNode
}

export function PreviewSuspense({ children, fallback }: PreviewSuspenseProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>
}

import { useEffect, useState } from 'react'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import { createClient } from 'next-sanity'

export function usePreview<T = any>(
  token: string | null,
  query: string,
  params?: Record<string, any>
): T | null {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    if (!projectId) return

    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: token || undefined,
      perspective: 'previewDrafts',
    })

    client.fetch<T>(query, params || {}).then(setData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, query])

  return data
}

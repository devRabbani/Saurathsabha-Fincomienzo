import { useEffect } from 'react'

export default function useTitle(name) {
  useEffect(() => {
    document.title = name
  }, [])
}

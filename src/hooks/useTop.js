import { useEffect } from 'react'

const useTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
}

export default useTop

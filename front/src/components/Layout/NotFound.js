import {useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


export function NotFound() {
  const navigate = useNavigate()
  const [countDown, setCountDown] = useState(3)
  useEffect(() => {
    const timer = setInterval(() => {
      if (countDown === 1) {
        navigate('/')
      } else {
        setCountDown(countDown - 1)
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [countDown, navigate])
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, this page don't exist.</p>
      <p>You will be redirected to home in {countDown}s.</p>
    </div>
  )
}
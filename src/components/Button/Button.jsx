import { useEffect, useState } from 'react'

import './Button.css'

export default function Button({ children, ...props }) {
  const [ripples, setRipples] = useState([])
  const [mouseDown, setMouseDown] = useState(false)
  const [key, setKey] = useState(0)

  function createRipple(e) {
    if (props.onMouseDown) props.onMouseDown()

    const btn = e.target.closest('button')
    const rect = btn.getBoundingClientRect()

    const ripple = rippleElement({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      arr: ripples,
      key,
    })

    const size = 2 * Math.sqrt(btn.clientWidth ** 2 + btn.clientHeight ** 2)
    btn.style.setProperty('--ripple-max', `${size}px`)

    setRipples((prev) => [...prev, ripple])
    setMouseDown(true)
    setKey(key + 1)
  }

  useEffect(() => {
    if (!mouseDown) {
      const timeout = setTimeout(() => setRipples([]), 0.3 * 1000)
      return () => clearTimeout(timeout)
    }
  }, [mouseDown])

  return (
    <button
      onMouseDown={createRipple}
      onMouseUp={() => setMouseDown(false)}
      {...props}
    >
      {children}
      {ripples.map((ripple) => ripple)}
    </button>
  )
}

function rippleElement({ x, y, arr, key }) {
  return (
    <div
      className="ripple"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
      key={key}
    ></div>
  )
}

import { useState, forwardRef } from 'react'

import Button from '../Button/Button'

import './Input.css'

const Input = forwardRef(
  (
    { id, type = 'text', label: inputLabel, value: iValue, onChange, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [value, setValue] = useState(iValue === undefined ? '' : iValue)

    function changeInput(e) {
      setValue(e.target.value)
      if (onChange) onChange(e)
    }

    return (
      <>
        <div className="input_area">
          <label htmlFor={id || inputLabel}>{inputLabel}</label>
          <div className="list_x">
            <input
              ref={ref}
              value={value}
              id={id || inputLabel}
              type={
                type === 'password'
                  ? showPassword
                    ? 'text'
                    : 'password'
                  : type
              }
              onChange={changeInput}
              {...props}
            />
            {type === 'password' && (
              <Button
                type="button"
                className="d_f_ce"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined">
                  visibility{showPassword ? '_off' : ''}
                </span>
              </Button>
            )}
          </div>
        </div>
      </>
    )
  }
)

export default Input

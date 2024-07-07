import { useState } from 'react'

import Button from '../Button/Button'

import './Alert.css'

export default function Alert({ children, title, onHide: handleHide, bgNone }) {
  const [show, setShow] = useState(true)
  if (!show) return null

  function hide() {
    setShow(false)
    if (handleHide) handleHide()
  }

  return (
    <div className="alert_area pos_full_page d_f_ce">
      <div
        className="pos_full_page alert_bg blur_theme_bg"
        onClick={hide}
      ></div>
      <div className={`alert_con list_y ${bgNone ? 'bg_none' : ''}`}>
        {title && (
          <div className="list_y_small">
            <div className="alert_con_top d_f_ai_ce d_f_jc_sb list_x">
              <div>{title}</div>
              <Button className="txt_red d_f_ce bd_50" onClick={hide}>
                <span className="material-symbols-outlined fz_small_icon">
                  close
                </span>
              </Button>
            </div>
            <div className="line_x line_dark"></div>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

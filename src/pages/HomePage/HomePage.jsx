import { useRef } from 'react'

import logo from '../../imgs/logo/AJ-Video.jpg'

import { goToHref } from '../../js/utils/href'
import { loadFromLocalStorage } from '../../js/localDB/localstorage'

import './HomePage.css'

export default function HomePage() {
  const hasAccount = useRef(loadFromLocalStorage('aj_videos')?.id).current

  function changeHref() {
    if (hasAccount) goToHref('/videos')
    if (!hasAccount) goToHref('/account/signup')
  }

  return (
    <>
      <div className="home_page h_100 d_f_ce">
        <div className="home_page_logo_con">
          <img src={logo} alt="Logo" />
          <div className="d_f_ce">
            <button
              className="con btn_cl home_page_play_btn scale_trns"
              onClick={changeHref}
            >
              {hasAccount && <span>Watch Videos</span>}
              {!hasAccount && <span>Create account</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

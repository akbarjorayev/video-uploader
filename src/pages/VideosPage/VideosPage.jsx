import { useRef } from 'react'

import Avatar from '../../components/Avatar/Avatar'
import Button from '../../components/Button/Button'
import VideosPageNewVideo from './components/VideosPageNewVideo/VideosPageNewVideo'
import VideosPageVideosList from './components/VideosPageVideosList/VideosPageVideosList'

import { goToHref } from '../../js/utils/href'
import { useFirestore } from '../../hooks/useFirebaseFirestore'
import { loadFromLocalStorage } from '../../js/localDB/localstorage'
import { logoutFromAccount } from '../../modules/account.module'

import './VideosPage.css'

export default function VideosPage() {
  const id = useRef(loadFromLocalStorage('aj_videos')?.id).current
  const [account] = useFirestore('accounts', `${id}`)

  return (
    <>
      <div className="h_100 d_f_ce">
        <div className="con video_page_con h_100 list_y">
          <div className="con_bd_cl list_y">
            <div className="list_x">
              <Avatar style={{ height: 50 }} />
              <div className="list_y_small d_f_jc_ce">
                <h2>{account?.name || 'Loading'}</h2>
                <div className="fz_small txt_opa">
                  @{account?.username || 'Loading'}
                </div>
              </div>
            </div>
            <Button
              className="btn_bd_cl fz_small"
              onClick={() => goToHref('/account/login')}
            >
              Change account
            </Button>
            <Button
              className="btn_bd_cr txt_red fz_small"
              onClick={logoutFromAccount}
            >
              Logout
            </Button>
          </div>
          <div>
            <div className="d_f_ce fz_medium">Videos</div>
            <hr />
          </div>
          <VideosPageVideosList account={account} />
          <hr />
          <div className="con_bd_df d_f_ce fz_small txt_opa">
            Please reload to see new uploaded videos
          </div>
          <hr />
          <VideosPageNewVideo />
        </div>
      </div>
    </>
  )
}

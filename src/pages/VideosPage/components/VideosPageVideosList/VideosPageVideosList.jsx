import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Button from '../../../../components/Button/Button'

import {
  downloadURLFromStore,
  downloadMetaDataFromStore,
} from '../../../../js/db/firebaseStore'
import { calcSize } from '../../../../js/utils/file'
import { toastData } from '../../../../js/utils/toast'

export default function VideosPageVideosList({ account }) {
  const [videos, setVideos] = useState([])

  function array(num) {
    return Array.from({ length: num }, (_, i) => i + 1)
  }

  useEffect(() => {
    async function loadData() {
      if (!account?.videos && account?.videos === 0) return

      try {
        const urls = await Promise.all(
          array(account?.videos).map(async (video) => {
            const url = await downloadURLFromStore(`${account?.id}/${video}`)
            const metadata = await downloadMetaDataFromStore(
              `${account?.id}/${video}`
            )
            return { url, metadata }
          })
        )
        setVideos(urls)
      } catch {
        setVideos([])
      }
    }
    loadData()
  }, [account?.videos])

  function copy(text) {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  return (
    <>
      <ToastContainer
        position={toastData.position}
        autoClose={toastData.autoClose}
        theme={toastData.theme}
        draggable
      />
      {!account?.id && !account?.videos && (
        <div className="con_bd_cl d_f_ce">Loading</div>
      )}
      {account?.id && !account?.videos && (
        <div className="con_bd_red txt_red d_f_ce">
          You do not have any videos yet
        </div>
      )}
      {account?.id && account?.videos && (
        <div className="list_y">
          {videos.map((video, i) => (
            <div key={i}>
              <div className="list_x">
                <div className="video_alert_video d_f_ce">
                  <span className="material-symbols-outlined">play_circle</span>
                </div>
                <div className="list_y_small d_f_jc_sb d_f_1 w_100_child">
                  <div>
                    <h2 className="txt_nowrap" style={{ maxWidth: '242px' }}>
                      {video.metadata.name}
                    </h2>
                    <div className="fz_small txt_opa">
                      {calcSize(video.metadata.size)}
                    </div>
                  </div>
                  <Button className="btn_bd_cl" onClick={() => copy(video.url)}>
                    Copy link
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

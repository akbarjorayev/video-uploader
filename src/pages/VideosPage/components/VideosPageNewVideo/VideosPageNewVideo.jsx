import { useEffect, useRef, useState } from 'react'

import Alert from '../../../../components/Alert/Alert'

import { calcSize } from '../../../../js/utils/file'
import { useFirebaseStoreRealtime } from '../../../../hooks/useFirebaseStore'
import { loadFromLocalStorage } from '../../../../js/localDB/localstorage'
import { incrementField } from '../../../../js/db/firebaseFirestore'
import { useFirestore } from '../../../../hooks/useFirebaseFirestore'

export default function VideosPageNewVideo() {
  const fileInput = useRef()
  const [file, setFile] = useState(false)

  return (
    <>
      <div
        className="con_bd_cl con_ha d_f_ce"
        onClick={() => fileInput.current.click()}
      >
        New video
      </div>
      <input
        ref={fileInput}
        type="file"
        className="d_n"
        accept="video/*"
        onChange={(e) => {
          setFile(e.target.files[0])
          fileInput.current.value = ''
        }}
      />
      {file && <VideoAlert file={file} setFile={setFile} />}
    </>
  )
}

function VideoAlert({ file, setFile }) {
  const id = useRef(loadFromLocalStorage('aj_videos')?.id).current
  const [upload, setUpload] = useState(false)
  const [account] = useFirestore('accounts', `${id}`)
  const { p, url, err } = useFirebaseStoreRealtime(
    `${id}/${(account?.videos || 0) + 1}`,
    file,
    upload
  )

  useEffect(() => {
    async function increase() {
      await incrementField('accounts', `${id}`, 'videos', 1)
    }

    if (p === 100) {
      increase()
      setFile(false)
      setUpload(false)
    }
  }, [url])

  return (
    <>
      <Alert onHide={() => setFile(false)}>
        <div className="list_y">
          <div className="list_x">
            <div className="video_alert_video d_f_ce">
              <span className="material-symbols-outlined">play_circle</span>
            </div>
            <div className="list_y_small d_f_jc_sb d_f_1 w_100_child">
              <div>
                <h2 className="txt_nowrap" style={{ maxWidth: '242px' }}>
                  {file.name}
                </h2>
                <div className="fz_small txt_opa">{calcSize(file.size)}</div>
                {upload && <div className="fz_small">{Math.floor(p)}%</div>}
              </div>
              <button
                className="btn_bd_cl video_alert_btn w_100"
                onClick={() => setUpload(true)}
              >
                <div
                  className="video_alert_btn_bg"
                  style={{ left: `${p - 100}%` }}
                ></div>
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>
      </Alert>
    </>
  )
}

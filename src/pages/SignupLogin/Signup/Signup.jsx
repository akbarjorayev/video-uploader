import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'

import { goToHref } from '../../../js/utils/href'
import { toastData } from '../../../js/utils/toast'
import {
  createAccount,
  saveIDToLocalStorage,
} from '../../../modules/account.module'
import { loadFromLocalStorage } from '../../../js/localDB/localstorage'

import '../SignupLogin.css'

export default function Signup() {
  const id = useRef(loadFromLocalStorage('aj_videos')?.id).current
  const [inputData, setInputData] = useState({
    name: '',
    username: '',
    password: '',
  })
  const [disabled, setDisabled] = useState(false)

  async function createAcc(e) {
    e.preventDefault()
    setDisabled(true)

    const created = await createAccount(inputData)
    if (!created.ok) toast.error(created.msg)
    if (created.ok) {
      const loggedIn = saveIDToLocalStorage(created.id)
      if (loggedIn.ok) goToHref('/')
    }

    setDisabled(false)
  }

  return (
    <>
      <ToastContainer
        position={toastData.position}
        autoClose={toastData.autoClose}
        theme={toastData.theme}
        draggable
      />
      <div className="d_f_ce h_100">
        <div className="list_y account_page_con">
          <div className="con_bd_cl list_y">
            <div className="list_x d_f_jc_sb">
              <h2>Signup</h2>
              <Button
                className="btn_cl"
                onClick={() => goToHref('/account/login')}
              >
                Login
              </Button>
            </div>
            <hr />
            <form className="list_y" onSubmit={createAcc} disabled={disabled}>
              <Input
                label="Name"
                value={inputData.name}
                autoFocus
                onChange={(e) =>
                  setInputData({ ...inputData, name: e.target.value })
                }
              />
              <Input
                label="Username"
                value={inputData.username}
                onChange={(e) =>
                  setInputData({ ...inputData, username: e.target.value })
                }
              />
              <Input
                label="Password"
                type="password"
                value={inputData.password}
                onChange={(e) =>
                  setInputData({ ...inputData, password: e.target.value })
                }
              />
              <Button
                className="btn_cl"
                disabled={
                  !inputData.name || !inputData.username || !inputData.password
                }
              >
                {disabled ? 'Creating account' : 'Create account'}
              </Button>
            </form>
          </div>
          {id && (
            <Button className="btn_cl" onClick={() => goToHref('/')}>
              Home page
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

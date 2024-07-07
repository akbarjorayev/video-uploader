import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'

import {
  loginToAccount,
  saveIDToLocalStorage,
} from '../../../modules/account.module'
import { goToHref } from '../../../js/utils/href'
import { toastData } from '../../../js/utils/toast'
import { loadFromLocalStorage } from '../../../js/localDB/localstorage'

import '../SignupLogin.css'

export default function Login() {
  const id = useRef(loadFromLocalStorage('aj_videos')?.id).current
  const [inputData, setInputData] = useState({
    username: '',
    password: '',
  })
  const [disabled, setDisabled] = useState(false)

  async function loginToAcc(e) {
    e.preventDefault()
    setDisabled(true)

    const loggedIn = await loginToAccount(inputData)
    if (!loggedIn.ok) toast.error(loggedIn.msg)
    if (loggedIn.ok) {
      const savedID = saveIDToLocalStorage(loggedIn.id)
      if (savedID.ok) goToHref('/')
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
              <h2>Login</h2>
              <Button
                className="btn_cl"
                onClick={() => goToHref('/account/signup')}
              >
                Signup
              </Button>
            </div>
            <hr />
            <form className="list_y" onSubmit={loginToAcc} disabled={disabled}>
              <Input
                label="Username"
                value={inputData.username}
                autoFocus
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
                disabled={!inputData.username || !inputData.password}
              >
                {disabled ? 'Loggin in' : 'Login'}
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

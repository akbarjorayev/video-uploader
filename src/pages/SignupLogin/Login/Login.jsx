import { useState } from 'react'

import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'

import { goToHref } from '../../../js/utils/href'

import '../SignupLogin.css'

export default function Login() {
  const [inputData, setInputData] = useState({
    username: '',
    password: '',
  })

  async function loginIntoAcc() {
    console.log(inputData)
  }

  return (
    <>
      <div className="d_f_ce h_100">
        <div className="con_bd_cl account_page_con list_y">
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
            onClick={loginIntoAcc}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  )
}

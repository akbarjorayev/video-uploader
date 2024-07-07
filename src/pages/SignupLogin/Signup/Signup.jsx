import { useState } from 'react'

import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'

import { goToHref } from '../../../js/utils/href'

import '../SignupLogin.css'

export default function Signup() {
  const [inputData, setInputData] = useState({
    name: '',
    username: '',
    password: '',
  })

  async function createAcc() {
    console.log(inputData)
  }

  return (
    <>
      <div className="d_f_ce h_100">
        <div className="con_bd_cl account_page_con list_y">
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
            disabled={
              !inputData.name || !inputData.username || !inputData.password
            }
            onClick={createAcc}
          >
            Create account
          </Button>
        </div>
      </div>
    </>
  )
}

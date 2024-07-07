import {
  saveToFirestore,
  incrementField,
  loadFromFirestoreWhere,
} from '../js/db/firebaseFirestore'
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../js/localDB/localstorage'
import { goToHref } from '../js/utils/href'
import { getNewUserID, isUsernameTaken } from './utils/account.module.util'

export async function createAccount({ name, username, password }) {
  const usernameTaken = await isUsernameTaken(username)
  if (usernameTaken) return { ok: false, msg: 'Username already taken' }

  const id = await getNewUserID()
  await saveToFirestore('accounts', `${id}`, { id, name, username, password })
  await incrementField('accounts', '_aboutAccounts', 'amount', 1)
  return { ok: true, msg: 'Account created successfully', id }
}

export function saveIDToLocalStorage(id) {
  const localData = loadFromLocalStorage('aj_videos')
  localData.id = id
  saveToLocalStorage('aj_videos', localData)

  return { ok: true, msg: 'Logged in successfully' }
}

export async function loginToAccount({ username, password }) {
  const account = ((await loadFromFirestoreWhere('accounts', [
    'username',
    '==',
    username,
  ])) || [])[0]

  if (!account) return { ok: false, msg: 'User not found' }

  if (account.password !== password)
    return { ok: false, msg: 'Password is incorrect' }

  return { ok: true, msg: 'Logged in successfully', id: account.id }
}

export function logoutFromAccount() {
  saveIDToLocalStorage(false)
  goToHref('/')
}

import {
  loadFromFirestore,
  loadFromFirestoreWhere,
} from '../../js/db/firebaseFirestore'

export async function isUsernameTaken(username) {
  const account = await loadFromFirestoreWhere('accounts', [
    'username',
    '==',
    username,
  ])

  return account.length > 0
}

export async function getNewUserID() {
  const amount =
    (await loadFromFirestore('accounts', '_aboutAccounts')).amount || 0

  return amount + 1
}

import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../localDB/localstorage'

export function checkApplication() {
  const localData = loadFromLocalStorage('aj_videos')
  if (localData) return

  saveToLocalStorage('aj_videos', getInitLocalData())
}

function getInitLocalData() {
  const data = {
    id: false,
  }

  return data
}

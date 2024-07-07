import defaultAvatar from './img/defaultAvatar.png'

import './Avatar.css'

export default function Avatar({ style }) {
  return (
    <>
      <div className="avatar" style={style}>
        <img src={defaultAvatar} alt="avatar" />
      </div>
    </>
  )
}

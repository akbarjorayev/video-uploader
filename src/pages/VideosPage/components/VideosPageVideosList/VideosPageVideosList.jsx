export default function VideosPageVideosList({ account }) {
  return (
    <>
      {!account?.id && !account?.videos && (
        <div className="con_bd_cl d_f_ce">Loading</div>
      )}
      {account?.id && !account?.videos && (
        <div className="con_bd_red txt_red d_f_ce">
          You do not have any videos yet
        </div>
      )}
      {account?.id && account?.videos && (
        <div className="con_bd_cl d_f_ce">Here you go</div>
      )}
    </>
  )
}

import React, {useState} from "react";
import s from "./styles.module.scss";
import MusicIcon from "../../static/music";
import EditIcon from "../../static/edit";
import TrashIcon from "../../static/trash";
import Modal from "../Modal";
import AddNewSong from "../AddNewSong";
import {useStore} from "../../request";


const Song = ({song}) => {
  const {
    songsStore: {
      deleteSong
    }
  } = useStore();

  const [songInfo, setSongInfo] = useState(false)

  const handleEditSong = (e, song) => {
    e.stopPropagation();
    setSongInfo(song)
  }
  const handleDeleteSong = (e, song) => {
    e.stopPropagation();
    deleteSong(song)
  }
  const handleCloseEditSong = () => setSongInfo(false)

  return (
      <div className={s.song}>
        <div className={s.songIcon}><MusicIcon/></div>
        <span>{song.name}</span>
        <div
            className={s.songEdit}
            onClick={(e) => handleEditSong(e, song )}
        >
          <EditIcon/>
        </div>
        <div
            className={s.songEdit}
            onClick={(e) => handleDeleteSong(e, song )}
        >
          <TrashIcon/>
        </div>
        {
          songInfo && <Modal onClose={handleCloseEditSong}>
            <AddNewSong albumId={songInfo.albumId} onClose={handleCloseEditSong} song={songInfo}/>
          </Modal>
        }
      </div>
  )
}
export default Song
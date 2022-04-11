import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useStore} from "../../request";
import {observer} from "mobx-react";
import VinylIcon from '../../static/vinyl'
import HeartIcon from '../../static/heart'
import AddIcon from '../../static/add'

import s from './styles.module.scss';
import Modal from "../Modal";
import AddNewSong from "../AddNewSong";
import Song from "../Song";

const AlbumPage = () => {
  const {
    albumId
  } = useParams();
  const [songInfo, setSongInfo] = useState(false)

  const {
    albumsStore: {
      getAlbumById,
      albumInfo,
    },
    songsStore: {
      songsByAlbumId,
      getSongsByAlbumId,
    }
  } = useStore();

  useEffect(() => {
    getAlbumById({
      id: albumId
    })
    getSongsByAlbumId({
      albumId
    })
  },[]);

  const handleAddSong = (e) => {
    e.stopPropagation()
    setSongInfo({albumId})
  }

  const handleCloseEditSong = () => setSongInfo(false)

  return (
      <div className={s.wrapper}>
        <div
            className={s.infoWrapper}
        >
          <div className={s.icon}>
            <VinylIcon/>
          </div>
          <div className={s.info}>
            <span className={s.title}>{albumInfo.name}</span>
            <span>{albumInfo.year} y.</span>
            <div className={s.rating}><HeartIcon/> <span>{albumInfo.mark}</span></div>
          </div>
        </div>
        <div
            className={s.createSong}
        >
          <div>Songs</div><AddIcon onClick={handleAddSong}/>
        </div>
        {
          songsByAlbumId?.map?.((song) => <Song song={song} key={song.id}/>)
        }
        {
          songInfo && <Modal onClose={handleCloseEditSong}>
            <AddNewSong albumId={albumId} onClose={handleCloseEditSong} song={songInfo}/>
          </Modal>
        }
      </div>
  )
}

export default observer(AlbumPage)
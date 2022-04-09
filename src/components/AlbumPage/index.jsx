import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useStore} from "../../request";
import {observer} from "mobx-react";
import VinylIcon from '../../static/vinyl'
import HeartIcon from '../../static/heart'
import MusicIcon from '../../static/music'
import EditIcon from '../../static/edit'
import AddIcon from '../../static/add'
import TrashIcon from '../../static/trash'

import s from './styles.module.scss';
import Modal from "../Modal";
import AddNewSong from "../AddNewSong";

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
      deleteSong
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


  const handleEditSong = (e, song) => {
    e.stopPropagation();
    setSongInfo(song)
  }
  const handleDeleteSong = (e, song) => {
    e.stopPropagation();
    deleteSong({
      id: song.id,
      albumId,
    })
  }
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
            <span className={s.year}>{albumInfo.year} y.</span>
            <div className={s.rating}><HeartIcon/> <span>{albumInfo.mark}</span></div>
          </div>
        </div>
        <div
            className={s.createSong}
        >
          <div>Songs</div><AddIcon onClick={handleAddSong}/>
        </div>
        {
          songsByAlbumId?.map?.((song) => (
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
              </div>
          ))
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
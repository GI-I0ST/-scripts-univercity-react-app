import React, {useEffect} from "react";
import {useStore} from "../../request";
import Song from "../Song";
import {observer} from "mobx-react";
import s from './styles.module.scss'

const SongsPage = () => {
  const {
    songsStore:{
      getAllSongs,
      songsList
    }
  } = useStore();

  useEffect(() => {
    getAllSongs()
  },[]);

  return (
      <div className={s.songs}>
        <h1>Songs</h1>
        <div>
          {
            songsList.map(song => <Song song={song} key={song.id}/> )
          }
        </div>
      </div>
  )
}
export default observer(SongsPage)
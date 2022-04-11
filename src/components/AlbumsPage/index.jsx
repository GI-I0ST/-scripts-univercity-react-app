import React, {useEffect} from "react";
import {useStore} from "../../request";
import Album from "../Album";
import {observer} from "mobx-react";
import s from './styles.module.scss';

const AlbumsPage = () => {
  const {
    albumsStore: {
      albumsList,
      getAllAlbums
    }
  } = useStore();

  useEffect(() => {
    getAllAlbums()
  }, [])

  return(
      <div className={s.albums}>
        <h1>Albums</h1>
        <div className={s.listWrapper}>
          {
            albumsList.map((album) => <Album album={album} key={album.id}/> )
          }
        </div>
      </div>

  )
}

export default observer(AlbumsPage)
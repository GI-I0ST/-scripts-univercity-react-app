import React, {useState} from "react";
import s from "./styles.module.scss";
import TrashIcon from "../../static/trash";
import {Link} from "react-router-dom";
import VinylIcon from "../../static/vinyl";
import AddIcon from "../../static/add";
import EditIcon from "../../static/edit";
import {useStore} from "../../request";
import Modal from "../Modal";
import AddNewSong from "../AddNewSong";
import AlbumCreate from "../AlbumCreate";

const Album = ({
                 album
               }) => {
  const {
    albumsStore: {
      deleteAlbum,
    },
  } = useStore();

  const [albumInfo, setAlbumInfo] = useState(undefined);
  const [songModalOpened, setSongModalOpened] = useState(false);
  const [albumModalIsOpened, setAlbumModalIsOpened] = useState(false);

  function handleAddSong(e, album) {
    e.stopPropagation();
    setAlbumInfo(album)
    setSongModalOpened(album)
  }

  function editAlbum(e, album) {
    e.stopPropagation();
    setAlbumInfo(album)
    setAlbumModalIsOpened(true);
  }

  function handleDelete(e, album) {
    e.stopPropagation();
    deleteAlbum(album)
  }

  function closeSongModal() {
    setSongModalOpened(false)
    setAlbumInfo(undefined)
  }

  function closeAlbumModal() {
    setAlbumModalIsOpened(false)
    setAlbumInfo(undefined)
  }

  return (
      <div className={s.albumItem} key={album.id}>
        <div
            className={s.delete}
            onClick={(e) => handleDelete(e, album)}
        ><TrashIcon/></div>
        <Link
            className={s.infoWrapper}
            to={`/album/${album.id}`}
        >
          <div className={s.albumTitle}>
            {album.name}
            <span>{album.year}</span>
          </div>
        </Link>
        <div className={s.albumImage}>
          <VinylIcon/>
        </div>
        <div
            className={s.addSong}
            onClick={(e) => handleAddSong(e, album)}
        >
          <AddIcon/>
        </div>
        <div
            className={s.editAlbum}
            onClick={(e) => editAlbum(e, album)}
        >
          <EditIcon/>
        </div>
        {
          songModalOpened &&
          <Modal onClose={closeSongModal}>
            <AddNewSong albumId={albumInfo.id} onClose={closeSongModal}/>
          </Modal>
        }
        {
          albumModalIsOpened && <Modal onClose={closeAlbumModal}>
            <AlbumCreate album={albumInfo} group={albumInfo.groupId} onClose={closeAlbumModal}/>
          </Modal>
        }
      </div>
  )
}

export default Album
import * as React from "react";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import AlbumCreate from "../AlbumCreate";
import VinylIcon from '../../static/vinyl';
import EditIcon from "../../static/edit";
import AddIcon from "../../static/add";
import TrashIcon from "../../static/trash";
import s from './styles.module.scss';
import Modal from "../Modal";
import {useStore} from "../../request";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";

function GroupPageComponent() {
    const [modalIsOpened, setModalIsOpened] = useState(false);
    const [editedAlbum, setEditedAlbum] = useState(undefined);
    let params = useParams();

    const {
        albumsStore: {
            deleteAlbum,
            getAlbumsByGroupId,
            albumsByGroupId
        },
        groupStore: {
            getGroupById,
            groupInfo
        }
    } = useStore();

    useEffect(() => {
        getGroupById({
            id: params.groupId
        })
        getAlbumsByGroupId({
            groupId: params.groupId
        })
    },[params.groupId])

    function newAlbum(e) {
        e.stopPropagation();
        setModalIsOpened(true);
    }

    function addSong (e) {
        e.stopPropagation();
        console.log('addSong');
    }

    function editAlbum(e, album) {
        e.stopPropagation();
        setEditedAlbum(album)
        setModalIsOpened(true);
    }

    function handleDelete(e, album) {
        e.stopPropagation();
        deleteAlbum({
            id: album.id,
            groupId: params.groupId
        })
    }
    function closeModal() {
        setModalIsOpened(false)
        setEditedAlbum(undefined)
    }

    return (<div className={s.groupWrapper}>
        <h1 className={s.groupHeader}>{groupInfo ? groupInfo.name : ""}</h1>
        <div className={s.albumList}>
            {albumsByGroupId.map((album) => {
                return <div className={s.albumItem} key={album.id}>
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
                        onClick={addSong}
                    >
                        <AddIcon/>
                    </div>
                    <div
                        className={s.editAlbum}
                        onClick={(e)=> editAlbum(e, album)}
                    >
                        <EditIcon/>
                    </div>
                </div>
            })}
            <div
                className={s.addAlbum}
                onClick={newAlbum}
            >
                <AddIcon/>
            </div>
        </div>
        {
            modalIsOpened && <Modal onClose={closeModal}>
                <AlbumCreate album={editedAlbum} group={params.groupId} onClose={closeModal}/>
            </Modal>
        }
    </div>);

}

export default observer(GroupPageComponent);
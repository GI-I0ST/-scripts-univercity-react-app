import * as React from "react";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import AlbumCreate from "../AlbumCreate";
import AddIcon from "../../static/add";
import s from './styles.module.scss';
import Modal from "../Modal";
import {useStore} from "../../request";
import {observer} from "mobx-react";
import Album from "../Album";

function GroupPageComponent() {
    const [albumModalIsOpened, setAlbumModalIsOpened] = useState(false);
    const [albumInfo, setAlbumInfo] = useState(undefined);
    let params = useParams();

    const {
        albumsStore: {
            getAlbumsByGroupId,
            albumsByGroupId,
        },
        groupStore: {
            getGroupById,
            groupInfo
        },
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
        setAlbumModalIsOpened(true);
    }

    function closeAlbumModal() {
        setAlbumModalIsOpened(false)
        setAlbumInfo(undefined)
    }


    return (<div className={s.groupWrapper}>
        <h1 className={s.groupHeader}>{groupInfo ? groupInfo.name : ""}</h1>
        <div className={s.albumList}>
            {albumsByGroupId.map((album) => <Album album={album} key={album.id}/>)}
            <div
                className={s.addAlbum}
                onClick={newAlbum}
            >
                <AddIcon/>
            </div>
        </div>
        {
            albumModalIsOpened && <Modal onClose={closeAlbumModal}>
                <AlbumCreate album={albumInfo} group={params.groupId} onClose={closeAlbumModal}/>
            </Modal>
        }
    </div>);

}

export default observer(GroupPageComponent);
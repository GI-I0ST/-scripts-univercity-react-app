import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useStore} from "../../request";
import {observer} from "mobx-react";

const AlbumPage = () => {
  const {
    albumId
  } = useParams();

  const {
    albumsStore: {
      getAlbumById,
      albumInfo
    }
  } = useStore();

  useEffect(() => {
    getAlbumById({
      id: albumId
    })
  },[])

  return (
      <div>
        AlbumPage for {albumId}
        Name = {albumInfo?.name}
        {
          JSON.stringify(albumInfo, null, 2)
        }
      </div>
  )
}

export default observer(AlbumPage)
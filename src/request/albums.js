import {action, makeObservable, observable} from "mobx";
import api from "./apiInstance";
import groupStore from './groups';
const URL = "/album"

class Albums {
  albumsByGroupId = [];
  albumInfo = {};

  constructor() {
    makeObservable(this, {
      albumsByGroupId: observable,
      albumInfo: observable,
      setAlbumsByGroupId: action,
      setAlbumInfo: action,
    })
  }


  setAlbumsByGroupId = data => this.albumsByGroupId = data;
  setAlbumInfo = data => this.albumInfo = data;

  //API
  addAlbum = ({
                name,
                year,
                mark,
                groupId,
                onSuccess,
                onError,
              }) => {
    const data = {
      name,
      year,
      mark,
      groupId,
    }

    const [req] = api.post({
      url: URL,
      data
    })
    const getAlbumsByGroupId = this.getAlbumsByGroupId;

    req
        .then((res) => {
          onSuccess?.(res.data)
          getAlbumsByGroupId?.({groupId})
        })
        .catch((err) => onError?.(err))
  }
  editAlbum = ({
                 id,
                 name,
                 year,
                 groupId,
                 onSuccess,
                 onError,
               }) => {
    const data = {
      id,
      name,
      year,
    }

    const [req] = api.put({
      url: URL,
      data
    })

    const getAlbumsByGroupId = this.getAlbumsByGroupId;
    req
        .then((res) => {
          onSuccess?.(res.data)
          getAlbumsByGroupId?.({groupId})
    })
        .catch((err) => onError?.(err))

  }
  getAllAlbums = ({
                    onSuccess,
                    onError,
                  }) => {

    const [req] = api.get({
      url: URL
    })

    req
        .then((res) => onSuccess?.(res.data))
        .catch((err) => onError?.(err))
  }
  getAlbumById = ({
                    id,
                    onSuccess,
                    onError
                  }) => {

    const setAlbumInfo = this.setAlbumInfo;
    const [req] = api.get({
      url: URL,
      config: {
        params: {id}
      }
    })

    req
        .then((res) => {
          onSuccess?.(res.data);
          setAlbumInfo(res.data)
        })
        .catch((err) => onError?.(err))
  }

  getAlbumsByGroupId = ({
                          groupId,
                          onSuccess,
                          onError
                        }) => {

    const [req] = api.get({
      url: URL,
      config: {
        params: {groupId}
      }
    })

    const setAlbumsByGroupId = this.setAlbumsByGroupId;
    req
        .then((res) => {
          setAlbumsByGroupId(res.data);
          onSuccess?.(res.data);
        })
        .catch((err) => onError?.(err))

  }
  deleteAlbum = ({
                   id,
                   groupId,
                   onSuccess,
                   onError
                 }) => {
    const data = {id}
    const getAlbumsByGroupId = this.getAlbumsByGroupId;

    const [req] = api.delete({
      url: URL,
      config: {data}
    })

    req
        .then((res) => {
          onSuccess?.(res.data)
          groupStore.getGroupById({id: groupId})
          getAlbumsByGroupId({groupId})
        })
        .catch((err) => onError?.(err))
  }

}

export default new Albums();
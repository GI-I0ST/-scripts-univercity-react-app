import {action, makeObservable, observable} from "mobx";
import api from "./apiInstance";
import groupStore from './groups';
const URL = "/album"

class Albums {
  albumsByGroupId = [];
  albumsList=[];
  albumInfo = {};

  constructor() {
    makeObservable(this, {
      albumsByGroupId: observable,
      albumInfo: observable,
      albumsList: observable,
      setAlbumsByGroupId: action,
      setAlbumInfo: action,
      setAlbumsList: action,
    })
  }


  setAlbumsByGroupId = data => this.albumsByGroupId = data;
  setAlbumInfo = data => this.albumInfo = data;
  setAlbumsList = data => this.albumsList = data;

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
    const getAllAlbums = this.getAllAlbums;
    req
        .then((res) => {
          onSuccess?.(res.data)
          getAlbumsByGroupId?.({groupId})
          getAllAlbums()
    })
        .catch((err) => onError?.(err))

  }
  getAllAlbums = ({
                    onSuccess,
                    onError,
                  } = {}) => {

    const [req] = api.get({
      url: URL
    })

    const setAlbumsList = this.setAlbumsList;

    req
        .then((res) => {
          setAlbumsList(res.data)
          onSuccess?.(res.data)
        })
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

    const data = {id : Number(id)}
    const getAlbumsByGroupId = this.getAlbumsByGroupId;
    const getAllAlbums = this.getAllAlbums;

    const [req] = api.delete({
      url: URL,
      config: {data}
    })

    req
        .then((res) => {
          onSuccess?.(res.data)
          groupStore.getGroupById({id: groupId})
          getAlbumsByGroupId({groupId})
          getAllAlbums()
        })
        .catch((err) => onError?.(err))
  }

}

export default new Albums();
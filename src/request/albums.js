import {makeObservable} from "mobx";
import api from "./apiInstance";

const URL = "/album"

class Albums {
  constructor() {
    makeObservable(this, {})
  }

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

    req
        .then((res) => {
          onSuccess?.(res.data)
        })
        .catch((err) => onError?.(err))
  }
  editAlbum = ({
                 id,
                 name,
                 year,
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

    req
        .then((res) => {
          onSuccess?.(res.data)
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

    const [req] = api.get({
      url: URL,
      config: {
        params: {id}
      }
    })

    req
        .then((res) => onSuccess?.(res.data))
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

    req
        .then((res) => onSuccess?.(res.data))
        .catch((err) => onError?.(err))

  }
  deleteAlbum = ({
                   id,
                   onSuccess,
                   onError
                 }) => {
    const data = {id}

    const [req] = api.delete({
      url: URL,
      config: {data}
    })

    req
        .then((res) => onSuccess?.(res.data))
        .catch((err) => onError?.(err))
  }

}

export default new Albums();
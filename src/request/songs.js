import {action, makeObservable, observable} from "mobx";
import api from "./apiInstance";

const url = "/song";

class Songs {
  songsByAlbumId = [];
  songsList = []
  songInfo = {};

  constructor() {
    makeObservable(this, {
      songsByAlbumId: observable,
      songInfo: observable,
      songsList: observable,
      setSongsByAlbumId: action,
      setSongInfo: action,
      setSongsList: action,
    })
  }

  setSongsByAlbumId = data => this.songsByAlbumId = data;
  setSongInfo = data => this.songInfo = data;
  setSongsList = data => this.songsList = data;

  //API
  addSong = ({
               name,
               albumId,
               onSuccess,
               onError
             }) => {
    if (!name || !albumId) return console.error("Not valid data");

    const data = {
      name,
      albumId
    }
    const getSongsByAlbumId = this.getSongsByAlbumId;
    const [req] = api.post({
      url,
      data
    })

    req
        .then((res) => {
          onSuccess?.(res.data)
          getSongsByAlbumId({albumId})
        })
        .catch((err) => {
          onError?.(err)
          console.error('err', err)
        })
  }

  getAllSongs = ({
                   onSuccess,
                   onError
                 }) => {
    const [req] = api.get({
      url
    })
    const setSongsList = this.setSongsList;

    req
        .then((res) => {
          setSongsList(res.data)
          onSuccess?.(res.data)
        })
        .catch((err) => {
          onError?.(err)
        })
  }

  getSongsByAlbumId = ({
                         albumId,
                         onSuccess,
                         onError,
                       }) => {
    if (!albumId) return console.error("Not valid data");
    const data = {albumId};

    const [req] = api.get({
      url,
      config: {params: data}
    })
    const setSongsByAlbumId = this.setSongsByAlbumId;

    req
        .then((res) => {
          setSongsByAlbumId(res.data);
          onSuccess?.(res.data);
        })
        .catch((err) => onError?.(err))
  }

  getSongById = ({
                   id,
                   onSuccess,
                   onError,
                 }) => {

    if (!id) return console.error("Not valid data");
    const data = {id}
    const setSongInfo = this.setSongInfo;

    const [req] = api.get({
      url,
      config: {
        params: data
      }
    })

    req
        .then((res) => {
          setSongInfo(res.data)
          onSuccess?.(res.data)
        })
        .catch((err) => onError?.(err));
  }

  editSong = ({
                id,
                albumId,
                name,
                onSuccess,
                onError,
              }) => {
    if (!id) return console.error("Not valid data");
    const data = {
      id,
      name,
    };

    const getSongById = this.getSongById;
    const getSongsByAlbumId = this.getSongsByAlbumId;

    const [req] = api.put({
      url,
      data
    })

    req
        .then((res) => {
          onSuccess?.(res.data)
          getSongById({id})
          getSongsByAlbumId({albumId})
        })
        .catch((err) => onError?.(err))
  }

  deleteSong = ({
                  id,
                  albumId,
                  onSuccess,
                  onError,
                }) => {
    if (!id || !albumId) return console.error("Not valid data");

    const getSongsByAlbumId = this.getSongsByAlbumId;
    const data = {id};

    const [req] = api.delete({
      url,
      config: {data}
    })

    req
        .then((res) => {
          getSongsByAlbumId({albumId})
          onSuccess?.(res.data)
        })
        .catch((err) => onError?.(err))

  }
}

export default new Songs();
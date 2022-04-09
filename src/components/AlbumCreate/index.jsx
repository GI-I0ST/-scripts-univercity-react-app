import * as React from "react";
import {useState} from "react";
import s from './styles.module.scss'
import {useStore} from "../../request";

const AlbumCreate = (props) => {
  const {
    album = {},
    group,
    onClose
  } = props;

  const {
    albumsStore: {
      addAlbum,
      editAlbum
    }
  } = useStore()

  const {
    name = "",
    year  = (new Date()).getFullYear(),
    mark  = 0,
    groupId = group,
    id
  } = album;

  const [formData, setFormData] = useState({
    name,
    year,
    mark
  });

  const handleChangeFormData = e => setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value.trim()
  }))

  const onSuccess = () => onClose?.();

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const data = {
      ...formData,
      onSuccess,
      groupId,
    }

    if (id) {
      data.id = id;
      editAlbum(data)
    } else {
      addAlbum(data)
    }
  }

  return (
      <div
          className={s.formWrapper}
      >
        <div className={s.formTitle}>
          {album.id ? "Edit album" : "Create new album"}
        </div>
        <form
            onSubmit={handleSubmit}
        >
          <div
              className={s.inputGroup}
          >
            <label htmlFor="name">Album name</label>
            <input
                type="text"
                value={formData.name}
                name={"name"}
                onInput={handleChangeFormData}
                id={"name"}
                className={"input"}
            />
          </div>
          <div
              className={s.inputGroup}
          >
            <label htmlFor="year">Album year</label>
            <input
                type="number"
                value={formData.year}
                name={"year"}
                id={"year"}
                min={0}
                step={1}
                onInput={handleChangeFormData}
                className={"input"}
            />
          </div>
          <div
              className={s.inputGroup}
          >
            <label htmlFor="mark">Album rating</label>
            <input
                type="number"
                value={formData.mark}
                name={"mark"}
                id={"mark"}
                onInput={handleChangeFormData}
                className={"input"}
                min={0}
                step={1}
            />
          </div>
          <button
              type={"submit"}
              className={"formSubmit"}
          >
            {
              album.id ?
                  "Save changes" :
                  "Create"
            }
          </button>
        </form>
      </div>
  )
}
export default AlbumCreate
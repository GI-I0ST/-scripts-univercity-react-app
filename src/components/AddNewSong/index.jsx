import React, {useState} from "react";
import s from "./styles.module.scss";
import {useStore} from "../../request";

const AddNewSong = (params) => {
  const {
    song = {},
    albumId,
    onClose,
  } = params;
  const {
    songsStore: {
      addSong,
      editSong,
    }
  } = useStore();

  const [formData, setFormData] = useState({
    name: song?.name || '',
    albumId,
  });

  const handleChangeFormData = e => setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value.trim()
  }))

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const data = {
      ...formData,
      onSuccess: () => onClose?.()
    };

    if (song.id) {
      data.id = song.id
      editSong(data)
    } else {
      addSong(data)
    }
  }

  return (
      <div className={s.wrapper}>
        <div className={s.title}>
          {
            song?.id ?
                "Edit song" :
                "Create new song"
          }
        </div>
        <form
            onSubmit={handleSubmit}
        >
          <div
              className={s.inputGroup}
          >
            <label htmlFor="name">Song name</label>
            <input
                type="text"
                value={formData.name}
                name={"name"}
                onInput={handleChangeFormData}
                id={"name"}
                className={"input"}
            />
          </div>
          <button
              type={"submit"}
              className={"formSubmit"}
          >
            {
              song.id ?
                  "Save changes" :
                  "Create"
            }
          </button>
        </form>

      </div>
  )
}

export default AddNewSong
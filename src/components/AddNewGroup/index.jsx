import * as React from "react";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import s from './styles.module.scss';
import {observer} from "mobx-react";
import {useStore} from "../../request";

export default (observer(({onClose, editedId}) => {
    const [inputValue, setInputValue] = useState('');
    const {
        groupStore: {
            groupInfo,
            getGroupById,
            addGroup,
            editGroup
        }
    } = useStore();
    let navigate = useNavigate();

    useEffect(() => {
        editedId && getGroupById({
            id: editedId,
        })
    }, [])

    useEffect(() => {
        editedId && groupInfo.id === editedId && setInputValue(groupInfo.name)
    }, [groupInfo])

    const handleInputChange = e => setInputValue(e.target.value);
    const redirectHandler = ({id}) => {
        navigate(`/group/${id}`)
        onClose?.()
    }

    const save = (e) => {
        e.stopPropagation();
        const params = {
            name: inputValue,
            onSuccess: redirectHandler,
        }
        editedId ?
            editGroup({
                id: groupInfo.id,
                ...params
            }) :
            addGroup(params)

    }


    return (<div className={s.newGroupWrapper}>
        <h1 className={s.newGroupTitle}>{
            editedId? "Edit group" : "Create new group"}</h1>
        <input
            className={s.input}
            type="text"
            value={inputValue}
            onInput={handleInputChange}
            placeholder={"Group name"}
        />
        <button className="btn btn-success btn-lg float-end" onClick={save}>Save</button>
    </div>);
}))
import * as React from "react";
import Api from "../request/api"
import {useNavigate, useParams} from "react-router";
import {useState} from "react";

export default function NewGroupComponent() {
    const [inputValue, handleChange] = useState('');
    const [groupId, setGroupId] = useState(null);
    let navigate = useNavigate();
    let params = useParams();

    if ( params.groupId && !groupId ) {
        // load group name
        Api.getGroup(params.groupId).then(data => {
            handleChange(data.name);
            setGroupId(params.groupId)
        })
    } else if (!params.groupId && groupId) {
        handleChange("");
        setGroupId("");
    }

    function save() {
        if(params.groupId) {
            Api.editGroup(params.groupId,inputValue).then(data => {
                navigate("/group/" + data.id);
            })
        } else {
            Api.newGroup(inputValue).then(data => {
                navigate("/group/" + data.id);
            })
        }
    }


    return (<div>
        <div className="input-group">
            <label className="form-label">Group name</label>
            <input className="form-control" type="text" value={inputValue} onInput={e => handleChange(e.target.value)}/>
        </div>
        <button className="btn btn-success" onClick={save}>Save</button>
    </div>);

}


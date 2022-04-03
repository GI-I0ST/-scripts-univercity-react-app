import * as React from "react";
import Api from "../request/api"
import {useParams} from "react-router";
import {useState} from "react";

function GroupPageComponent() {
    const [group, setGroup] = useState(null);
    let params = useParams();

    if (!group) {
        Api.getGroup(params.groupId).then(data => {
            console.log('group', data);
            setGroup(data)
        });
    }

    return (<div>
        <h1>{group ? group.name : ""}</h1>
        <div>
            <div>album 1</div>
            <div>album 2</div>
        </div>
    </div>);

}

export default GroupPageComponent;
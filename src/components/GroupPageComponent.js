import * as React from "react";
import Api from "../request/api"
import {useParams} from "react-router";
import {useState} from "react";
import AlbumEditComponent from "./AlbumEditComponent";

function GroupPageComponent() {
    const [group, setGroup] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [modal, setModal] = useState('');
    let params = useParams();

    if (!group) {
        Api.getGroup(params.groupId).then(data => {
            setGroup(data)
        });
        Api.getGroupAlbums(params.groupId).then(data => {
            setAlbums(data)
        });
    }

    function newAlbum() {
        console.log('click');
        setModal(<AlbumEditComponent />);
    }

    function editAlbum(album) {
        console.log('edit album', album);
        // let album = albums.find(val => val.id === id);
        setModal(<AlbumEditComponent album={album} />);
    }

    return (<div>
        <h1>{group ? group.name : ""}</h1>
        <div>
            <div className="btn btn-success" onClick={newAlbum}>Add album</div>
        </div>
        <div>
            {albums.map((album) => {
                return <div className="d-flex" key={album.id}>
                    <div >{album.year} - {album.name}</div>
                    <div className="btn btn-primary ms-auto" onClick={()=> editAlbum(album)}>edit</div>
                    <div className="btn  btn-warning">add song</div>
                </div>
            })}
        </div>

        {modal}
    </div>);

}

export default GroupPageComponent;
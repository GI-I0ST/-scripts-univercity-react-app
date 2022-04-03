import * as React from "react";
import Api from "../request/api"

class AlbumEditComponent extends React.Component {

    constructor(props) {
        super(props);
        this.nameChange = this.nameChange.bind(this);
        this.yearChange = this.yearChange.bind(this);

        let album = props.album ? props.album : {
            "name": "",
            "year": 0,
            "mark": 0,
            "groupId": 0
        };
        console.log("1 album", album);
        this.state = {
            album: album
        };
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);
    }

    nameChange(e) {
        this.state.album.name = e.target.value;
        this.setState({album: this.state.album});
    }

    yearChange(e) {
        this.state.album.year = e.target.value;
        this.setState({album: this.state.album});
    }

    close() {
        if (this.props.close) {
            this.props.close();
        }
    }

    save() {
        if(this.state.album.id) {
            // edit
            console.log('album data send')
            Api.editAlbum(this.state.album).then(data => {
                console.log('album edit result', data);
            })
        } else {
            // create

        }
    }

    render() {
        console.log("2 album", this.state.album);

        return (
            <div className="modal d-block" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    onClick={this.close}/>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="name">Album name</label>
                                <input type="text" className="form-control" id="name" value={this.state.album.name} onChange={this.nameChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="year">Year</label>
                                <input type="text" className="form-control" id="year" value={this.state.album.year} onChange={this.yearChange}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={this.close}>Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={this.save}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AlbumEditComponent;
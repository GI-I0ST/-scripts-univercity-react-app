import * as React from "react";
import Api from "../request/api"

class GroupListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    componentWillMount() {
        Api.getAllGroups().then(data => {
            this.setState({data: data})
        });

    }

    render() {
        const list = this.state.data.map(v => <a className="list-group-item list-group-item-actio" href={'/group/'+v.id} key={v.id}>{v.name}</a>);
        return (<div className="list-group">{list}</div>);
    }
}

export default GroupListComponent;
import * as React from "react";
import Api from "../request/api"

class GroupComponent extends React.Component {
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
        const list = this.state.data.map(v => <li key={v.id}>{v.name}</li>);
        return (<ul>{list}</ul>);
    }
}

export default GroupComponent;
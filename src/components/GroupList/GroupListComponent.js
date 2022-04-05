import * as React from "react";
import {withStore} from "../../request";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import s from './styles.module.scss';

class GroupListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.groupStore = props?.store?.groupStore;
  }

  componentDidMount() {
    this.groupStore?.getAllGroups?.()
  }

  render() {
    const groupList = this.groupStore?.allGroups;
    const list = groupList?.map(({id, name}) => <Link
        to={'/group/' + id}
        key={id}
        className={s.listItem}
    >
      {name}
    </Link>);

    return (<div className={s.list}>{list}</div>);
  }
}

export default withStore(observer(GroupListComponent))
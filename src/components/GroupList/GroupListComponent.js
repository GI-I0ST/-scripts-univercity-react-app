import * as React from "react";
import {withStore} from "../../request";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import s from './styles.module.scss';
import CloseButton from "../Buttons/CloseButton";
import EditIcon from "../../static/edit";
import Modal from "../Modal";
import NewGroupComponent from "../AddNewGroup";

class GroupListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.groupStore = props?.store?.groupStore;
    this.state = {
      groupModalOpened: false,
    }

    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.getId = this.getId.bind(this);
  }

  componentDidMount() {
    this.groupStore?.getAllGroups?.()
  }

  getId(e) {
    return Number(e.currentTarget.dataset?.id) || false;
  }

  handleModalOpen(e) {
    e.stopPropagation();
    this.setState({groupModalOpened: this.getId(e)})
  }

  render() {
    const groupList = this.groupStore?.allGroups;
    const handleDelete = (e) => {
      e.stopPropagation();
      const id = this.getId(e);
      this.groupStore?.deleteGroup?.({id});
    }

    return (<div className={s.list}>
      {
        groupList?.map(({id, name}) => <div
            className={s.listItem}
            key={id}
        >
          <CloseButton onClick={handleDelete} data-id={id} className={s.closeBtn}/>
          <div className={s.edit} onClick={this.handleModalOpen} data-id={id}>
            <EditIcon/>
          </div>
          <Link
              to={`/group/${id}`}
          >
            {name}
          </Link>
        </div>)
      }
      {
        this.state?.groupModalOpened && <Modal onClose={this.handleModalOpen}>
          <NewGroupComponent onClose={this.handleModalOpen} editedId={this.state.groupModalOpened}/>
        </Modal>
      }
    </div>);
  }
}

export default withStore(observer(GroupListComponent))